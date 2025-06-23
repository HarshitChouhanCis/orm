app.post('/event-medias', async (req, res) => {
try {
  const { primaryImage, galleryImage, video } = req.body;

  // Validate that primaryImage, galleryImage, and video arrays are present and not empty
  if (
    !Array.isArray(primaryImage) || primaryImage.length === 0 ||
    !Array.isArray(galleryImage) || galleryImage.length === 0 ||
    !Array.isArray(video) || video.length === 0
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error: primaryImage, galleryImage, and video are required and must not be empty arrays.',
    });
  }

  const allMediaRaw = [...primaryImage, ...galleryImage, ...video];

  // Validate eventId, url, and sourceType
  const invalidItems = allMediaRaw.filter(item =>
    !item.eventId ||
    !item.url ||
    !item.sourceType ||
    !['uploaded', 'template'].includes(item.sourceType)
  );

  if (invalidItems.length > 0) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error: Each media item must include a valid eventId, url, and sourceType ("uploaded" or "template").',
    });
  }

  // Format the media data
  const formatData = (items, mediaType) =>
    items.map((item) => ({
      eventId: item.eventId,
      mediaType,
      sourceType: item.sourceType,
      url: item.url,
      thumbnailUrl: item.thumbnailUrl ?? null,
      mediaFormat: item.mediaFormat,
      altText: item.altText ?? null,
      isPrimary: item.isPrimary ?? false,
      isVideo: mediaType === 'video',
    }));

  const allMedia = [
    ...formatData(primaryImage, 'primary_image'),
    ...formatData(galleryImage, 'gallery_image'),
    ...formatData(video, 'video'),
  ];

  const createdMedia = await prisma.eventMedia.createMany({
    data: allMedia,
    skipDuplicates: true,
  });

  return res.json({
    status: 200,
    count: createdMedia.count,
    message: 'Event media records created successfully',
  });
} catch (error) {
  console.error('Error creating event media:', error);
  return res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
}

});





// ------------------------------------------------------------------------------------------------



app.post('/upload-multiple', upload.array('images', 10), async (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) return res.status(400).send('No files uploaded.');

  try {
    const uploadedFiles = [];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    for (const file of files) {
      // Validate file type
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: `Validation error: File ${file.originalname} must be JPG, PNG, or MP4.`,
        });
      }

      // Validate file size
      if (file.size > maxSize) {
        return res.status(400).json({
          message: `Validation error: File ${file.originalname} exceeds 2MB size limit.`,
        });
      }

      // Upload to S3
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `uploads/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
      uploadedFiles.push(fileUrl);
    }

    res.json({ message: 'Multiple files uploaded successfully', files: uploadedFiles });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Upload failed.');
  }
});