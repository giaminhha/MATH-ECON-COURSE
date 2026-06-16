# Toán Tồn Tại (Math-Econ Game)

Dự án học Toán qua Game ra Quyết định Tài chính. Dự án được xây dựng bằng **Next.js (React) + Tailwind CSS** cho Frontend và **Python (FastAPI) + SQLite** cho Backend.

## Hướng Dẫn Chạy Dự Án

Bạn cần bật đồng thời **2 Terminal** (một cho hệ thống Web Fullstack Next.js và một cho Backend API) trong VS Code.

### 1. Khởi động Web System (Next.js)

Mở một Terminal mới (Ctrl + \`) ở ngay thư mục gốc của dự án (`MATH-ECON`) và chạy:

```bash
# (Tùy chọn) Cài đặt các gói NPM nếu đây là lần đầu tiên
npm install

# Bật hệ thống Web chạy bằng Next.js
npm run dev
```
➜ Giao diện và Game sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

### 2. Khởi động Backend API (Python FastAPI)

Mở thêm một Terminal thứ hai bằng cách bấm dấu **+** trong cửa sổ Terminal của VS Code, sau đó chạy:

```bash
# Di chuyển vào thư mục backend
cd backend

# (Tùy chọn) Cài đặt thư viện nếu đây là lần đầu tiên bạn chạy
pip install -r requirements.txt

# Khởi động server FastAPI
uvicorn main:app --reload
```
➜ Backend API sẽ chạy tại: [http://localhost:8000](http://localhost:8000)

### 3. Trải nghiệm Website

Khi cả 2 terminal đã chạy thành công, hãy mở trình duyệt web và truy cập vào: 
👉 **http://localhost:3000**

---

*Lưu ý: Mọi tài khoản tạo mới sẽ tự động lưu vào file hệ thống dữ liệu cục bộ `backend/math_econ.db`.*
