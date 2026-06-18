import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">SecureBank</h3>
            <p className="text-sm text-muted-foreground">
              Your financial partner for life
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/bank-and-save">
                  Bank &amp; Save
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/credit-cards">
                  Credit Cards
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/loans">
                  Loans
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/retirement">
                  Retirement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-muted-foreground hover:text-foreground" href="/calculators">
                  Calculators
                </Link>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Financial Guides
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1800 123 456</li>
              <li>support@securebank.com</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 SecureBank. All rights reserved. This is a demo banking website.</p>
        </div>
      </div>
    </footer>
  );
}
