"use client";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
          <h2 className="text-2xl font-semibold text-gray-700">
            Oops! Page Not Found
          </h2>
          <p className="text-muted-foreground">
            It seems we can&apos;t find the page you&apos;re looking for.
            Don&apos;t worry, even the sweetest treats can be hard to find
            sometimes!
          </p>
        </div>
      </body>
    </html>
  );
}
