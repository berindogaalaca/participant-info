


# Katılımcı Formu Uygulaması

## Proje Açıklaması

Bu proje, Next.js ve TypeScript ile inşa edilmiş bir katılımcı formu uygulamasıdır. Kullanıcıların katılımcı bilgilerini eklemesine ve güncellemesine olanak tanır. Uygulama, form işleme, doğrulama, dil seçeneği, tema değiştirme özellikleri içerir ve veri kalıcılığı için Prisma aracılığıyla bir MySQL veritabanı kullanır. UI, modern ve erişilebilir bir kullanıcı deneyimi için Tailwind CSS ve Shadcn UI bileşenleri kullanılarak oluşturulmuştur.

Projenin canlı versiyonu için : https://participant-info.vercel.app/tr

Canlı versiyonunda sunucu üzerinden veritabanına bağlanılmıştır. Tüm aşamalarını canlı versiyonundan test edebilirsiniz.

## Kurulum Talimatları

1.  **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/berindogaalaca/participant-info.git
    cd participant-form
    ```

2.  **Bağımlılıkları yükleyin:**

    ```bash
    npm install
    ```

3.  **MySQL veritabanınızı ayarlayın:**

    - Bir MySQL veritabanı örneğinizin çalıştığından emin olun.
    - Projenin kök dizininde bir `.env` dosyası oluşturun.
    - Veritabanı bağlantı URL'nizi `.env` dosyasına `DATABASE_URL` olarak ekleyin. Örnek:
      ```
      DATABASE_URL="mysql://kullanici:parola@sunucu:port/veritabani_adi"
      ```

4.  **Veritabanı şemasını ayarlamak için Prisma migrations'ı çalıştırın:**

    ```bash
    npx prisma generate
    npx prisma migrate dev
    ```

5.  **Geliştirme sunucusunu başlatın:**

    ```bash
    npm run dev
    ```

    Uygulama şimdi `http://localhost:3000` adresinde çalışıyor olmalıdır.

## Özellikler

- **Katılımcı Ekle:** Kullanıcıların modal bir form aracılığıyla katılımcı ayrıntılarını girmesine olanak tanır.
- **Katılımcı Güncelle:** Kolay güncellemeler için formu mevcut katılımcı verileriyle önceden doldurur.
- **Katılımcı Sil:** Katılımcı kayıtlarının silinmesini sağlar.
- **Form Doğrulama:** Veri bütünlüğünü sağlamak için Zod şemalarını kullanarak güçlü form doğrulama uygular.
- **Uluslararasılaştırma (i18n):** `next-intl` kullanarak birden çok dili (Almanca ve Türkçe dahil) destekler.
- **Tema Değiştirme:** Kullanıcı tercihi için açık ve koyu tema modları sağlar.
- **Duyarlı Tasarım:** Farklı ekran boyutlarında duyarlılık için Tailwind CSS ile oluşturulmuştur.
- **Toast Bildirimleri:** Başarı ve hata mesajları için kullanıcı dostu toast bildirimleri görüntüler.
- **Erişilebilir UI:** Gelişmiş erişilebilirlik için Shadcn UI bileşenlerini ve ARIA özelliklerini kullanır.

## API Uç Noktaları

Aşağıdaki API uç noktaları `src/app/api/user` içinde tanımlanmıştır:

- **`GET /api/user/read`**: Veritabanından tek bir kullanıcı kaydı getirir. Bulunursa kullanıcı verilerini, bulunamazsa bir hata mesajı döndürür.
- **`POST /api/user/upsert`**: Yeni bir kullanıcı oluşturur veya mevcut bir kullanıcıyı günceller. İstek gövdesinde `createUserSchema`'ya göre doğrulanmış kullanıcı verileri bekler.
- **`DELETE /api/user/delete`**: `id` sorgu parametresine göre bir kullanıcı kaydını siler.

## Veritabanı Şeması

Veritabanı şeması `prisma/schema.prisma` içinde tanımlanmıştır.

## Dil Desteği (i18n)

Uygulama, dil desteği için `next-intl` kullanır. Çeviriler, Almanca (`de.json`), İngilizce (`en.json`) ve Türkçe (`tr.json`) için `src/i18n/locales` içinde bulunur.

- **Yapılandırma:** i18n, `src/app/[locale]/layout.tsx` ve `src/i18n/routing.ts` içinde yapılandırılmıştır.
- **Kullanım:** Çevirilere, bileşenler içinde `next-intl/client`'dan `useTranslations` hook'u kullanılarak erişilir.

## UI Bileşenleri

UI, Radix UI ve Tailwind CSS ile oluşturulmuş yeniden kullanılabilir UI bileşenleri koleksiyonu olan Shadcn UI kullanılarak oluşturulmuştur. Özel bileşenler `src/components/ui/` içinde ve formla ilgili bileşenler `src/components/hook-form/` içinde bulunur.

- **Temel Bileşenler:** Shadcn UI'dan `Card`, `Button`, `Label`, `Input`, `Select`, `Checkbox`, `Dialog`, `DropdownMenu`, `Toast` ve `Switch` gibi bileşenleri kullanır.
- **Form Bileşenleri:** Daha kolay form yönetimi için `react-hook-form` ile entegre olmak üzere özel form bileşenleri (`RHFTextField`, `RHFSelect`, `RHFCheckbox`, `RHFMaskTextField`) oluşturulmuştur.

## Durum Yönetimi ve Veri Getirme

React Query veri getirme ve durum yönetimi için kullanılır.

- **Hook'lar:** `src/hooks/use-user.ts` içindeki `useUser`, `useUpsertUser` ve `useDeleteUser` gibi özel hook'lar, veri getirme mantığını kapsar ve API uç noktalarıyla etkileşim kurar.
