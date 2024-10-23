import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-background border-b mb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Decklassify</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                ホーム
              </Link>
              <Link href="/ranking" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                ランキング
              </Link>
              <Link href="/howto" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                使い方
              </Link>
            </nav>
          </div>
          {/* <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">検索</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="flex items-center">
          </div> */}
        </div>
      </div>
    </header>
  )
}