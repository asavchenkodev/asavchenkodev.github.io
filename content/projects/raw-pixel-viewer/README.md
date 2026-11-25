---
title: Raw Pixel Viewer
date: 2026-08-24
description: Inspect raw NV12, YUV, Bayer, RGB, and grayscale pixel buffers directly in the browser.
tags: [computer-vision, image-processing, browser-tool]
featured: true
launch: /tools/raw-pixel-viewer/
---

# Raw Pixel Viewer

Raw Pixel Viewer opens camera and image buffers directly in the browser. It supports common raw layouts such as NV12, planar YUV, packed YUV422, Bayer RAW, RGB, and grayscale data. Files are decoded locally and never uploaded.

[Open the live tool](/tools/raw-pixel-viewer/)

## Supported formats

- **YUV semi-planar:** NV12, NV21, NV16, NV61, and P010, including 10 to 16-bit data in 16-bit words, little or big endian.
- **YUV planar:** I420 (YUV420P), YV12, YUV422P, and YVU422P.
- **YUV packed:** YUYV (YUY2) and UYVY, with BT.601, BT.709, or BT.2020 matrices in limited or full range.
- **Bayer RAW:** RGGB, BGGR, GRBG, and GBRG; 8-bit, 10 to 16-bit in 16-bit words, and packed MIPI RAW10 and RAW12.
- **RGB and grayscale:** RGB24, BGR24, RGBA32, BGRA32, ARGB32, ABGR32, GRAY8, and GRAY16.
- **Images:** PNG, JPEG, and BMP, for comparing buffers.
