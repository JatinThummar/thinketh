# 📘 GitHub Pages Deployment Guide

This project uses the `/docs` folder to deploy a static site via **GitHub Pages** from the `mybranch` branch.

---

## 🔧 GitHub Setup Instructions

1. Go to your repository on GitHub:  
   `https://github.com/JatinThummar/thinketh`

2. Click the **Settings** tab (gear icon at the top).

3. Scroll down to the **"GitHub Pages"** section.

4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch:** `mybranch`
   - **Folder:** `/docs`

5. Click **Save**.

6. After a few minutes, your site will be live at:  
   `https://JatinThummar.github.io/thinketh/`

---

## 🛠 Important Notes

- The `/docs` folder **must not** be listed in `.gitignore`.
- Always run the build command **before pushing**:

  ```bash
  npm run build:static
