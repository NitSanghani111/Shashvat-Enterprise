# 📁 Catalog Images Folder

## Purpose
This folder contains all the catalog page images for the digital flipbook catalog viewer.

## 📸 Required Images

Place your catalog page images here with these exact names:

- `cover.jpg` - Front cover of the catalog
- `page1.jpg` - First content page
- `page2.jpg` - Second content page
- `page3.jpg` - Third content page
- `page4.jpg` - Fourth content page
- `page5.jpg` - Fifth content page
- `page6.jpg` - Sixth content page
- `back.jpg` - Back cover

## 📏 Image Specifications

### Recommended Dimensions
- **Width:** 1200px - 1600px
- **Height:** 1600px - 2000px (maintains book page ratio)
- **Aspect Ratio:** 3:4 or 2:3 (portrait orientation)

### File Format
- **Primary:** JPG (for photos and detailed pages)
- **Alternative:** PNG (for pages with transparency)

### File Size
- **Target:** 100KB - 300KB per image
- **Maximum:** 500KB per image

### Quality
- **JPG Quality:** 85% (good balance of quality and size)
- **Resolution:** 72-96 DPI (for web)

## 🔧 How to Prepare Images

### Option 1: Convert PDF to Images

1. **Online Tools:**
   - [PDF2PNG.com](https://pdf2png.com/)
   - [CloudConvert.com](https://cloudconvert.com/pdf-to-jpg)
   - [ILovePDF.com](https://www.ilovepdf.com/pdf_to_jpg)

2. **Adobe Acrobat:**
   - File → Export To → Image → JPEG
   - Settings: High Quality, 1200px width

3. **Command Line (ImageMagick):**
   ```bash
   convert -density 150 catalog.pdf -quality 85 page_%d.jpg
   ```

### Option 2: Design in Canva/Photoshop

1. Create pages at 1200x1600px
2. Export as JPG at 85% quality
3. Name files sequentially

## 🎨 Image Optimization

### Compress Images

Use these tools to reduce file size without losing quality:

1. **TinyPNG** - https://tinypng.com/
2. **Squoosh** - https://squoosh.app/
3. **ImageOptim** (Mac) - https://imageoptim.com/

### Command Line (ImageMagick)

```bash
# Resize and compress all images
for file in *.jpg; do
  convert "$file" -resize 1200x -quality 85 "optimized_$file"
done
```

## 📝 Naming Convention

```
cover.jpg          ← Front cover (page 0)
page1.jpg          ← Content page 1
page2.jpg          ← Content page 2
page3.jpg          ← Content page 3
page4.jpg          ← Content page 4
page5.jpg          ← Content page 5
page6.jpg          ← Content page 6
back.jpg           ← Back cover (last page)
```

## ✅ Checklist Before Upload

- [ ] All images are in JPG or PNG format
- [ ] Image dimensions are at least 1200px wide
- [ ] File sizes are under 500KB each
- [ ] File names match exactly (case-sensitive)
- [ ] Images are in correct sequential order
- [ ] Images display correctly when previewed
- [ ] Total folder size is reasonable (under 5MB)

## 🚀 Testing Your Images

After adding images:

1. Open your website
2. Click "Open Catalog" button
3. Check if all pages load correctly
4. Test page flipping animations
5. Verify image quality on different devices
6. Test on mobile and desktop

## 🐛 Troubleshooting

### Images Not Showing
- Check file names match exactly
- Verify files are in `/public/catalog/` folder
- Check browser console for 404 errors
- Ensure no special characters in file names

### Images Too Large
- Compress using TinyPNG or similar
- Resize to max 1600px width
- Convert PNG to JPG if possible
- Reduce JPG quality to 80-85%

### Poor Image Quality
- Increase source image resolution
- Export at higher quality setting
- Use PNG for text-heavy pages
- Avoid over-compression

## 📊 Example Structure

```
public/
  catalog/
    cover.jpg       (245 KB)
    page1.jpg       (189 KB)
    page2.jpg       (203 KB)
    page3.jpg       (178 KB)
    page4.jpg       (195 KB)
    page5.jpg       (167 KB)
    page6.jpg       (181 KB)
    back.jpg        (156 KB)
    
    Total: ~1.5 MB
```

## 🎯 Best Practices

1. **Consistent Sizing:** Keep all pages the same dimensions
2. **Sequential Naming:** Use sequential numbers (page1, page2, etc.)
3. **Optimize Early:** Compress images before uploading
4. **Test First:** Test with a few images before adding all
5. **Backup:** Keep original high-resolution versions

## 📞 Need Help?

If you're having trouble:
1. Check the main `CATALOG_SETUP_GUIDE.md` in project root
2. Review browser console for errors
3. Verify all file paths are correct
4. Test images in isolation first

---

**Note:** This folder is for the digital flipbook viewer. For the downloadable PDF catalog, place your PDF in `/public/downloads/` folder.
