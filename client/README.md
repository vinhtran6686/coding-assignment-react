# Cấu trúc dự án React

## Giới thiệu
Dự án này tuân theo cấu trúc module-centric, với các module đóng gói các tính năng đầy đủ bao gồm UI components, business logic, và API calls.

## Cấu trúc thư mục

```
client/src/
├── app/                              # Core application directory
│   ├── core/                         # Core app functionality
│   │   ├── layout/                   # Layout components
│   │   │   ├── components/           # Layout components (header, sidebar)
│   │   │   ├── core/                 # Layout providers và hooks
│   │   │   └── MasterLayout.tsx      # Main layout wrapper
│   │   ├── theme/                    # Theme configuration
│   │   │   ├── components/           # Theme components
│   │   │   └── theme.ts              # Theme definition
│   │   └── utils/                    # Utility functions
│   │
│   ├── modules/                      # Feature modules
│   │   ├── auth/                     # Authentication module
│   │   ├── ticket/                   # Ticket module
│   │   └── errors/                   # Error handling module
│   │
│   ├── pages/                        # Page components (cầu nối)
│   │   ├── dashboard/                # Dashboard pages
│   │   └── profile/                  # Profile pages
│   │
│   ├── routing/                      # Routing logic
│   │
│   └── app.tsx                       # Main app component
│
├── assets/                           # Static assets (images, fonts)
│   ├── media/                        # Media files
│   └── styles/                       # Global styles
│
└── main.tsx                          # Application entry point
```

## Cách tiếp cận Module-Centric

Mỗi module trong `/app/modules` hoạt động như một mini-application và được tổ chức như sau:

- **components/**: UI components cụ thể của module
- **screens/**: Screens hoàn chỉnh tạo thành từ các components
- **services/**: API calls và các services cần thiết
- **core/**: Business logic, context providers
- **hooks/**: Custom React hooks
- **[ModuleName]Page.tsx**: Entry point của module

## Vai trò của Pages

Các pages trong `/app/pages` chủ yếu hoạt động như cầu nối đến các screens trong modules. Chúng:

1. Import screens từ module tương ứng
2. Cung cấp một điểm truy cập rõ ràng từ routing
3. Có thể áp dụng các layout hoặc logic cần thiết

## Tương tác giữa các Module

Các module có thể tương tác với nhau thông qua:

1. Import trực tiếp các components đã export
2. Sử dụng hooks được export từ một module khác
3. Sử dụng Redux store chung (nếu có)

## Quy tắc chung

1. **Self-contained Modules**: Mỗi module chịu trách nhiệm cho một tính năng cụ thể
2. **Separation of Concerns**: Business logic và UI được tách biệt rõ ràng
3. **Dependency Management**: Các dependencies cần rõ ràng và có hướng
4. **Encapsulation**: Chỉ export những APIs cần thiết từ mỗi module
