import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const contacts = [
    {
      label: "Email",
      icon: "/mail.svg",
      href: "mailto:luisolea097@gmail.com",
    },
    {
      label: "Instagram",
      icon: "/instagram.svg",
      href: "https://www.instagram.com/luisoleaa/",
    },
    {
      label: "LinkedIn",
      icon: "/linkedin.svg",
      href: "https://www.linkedin.com/in/luis-olea-668759295/",
    },
    {
      label: "GitHub",
      icon: "/github_logo.svg",
      href: "https://github.com/luisoleaa",
    },
  ];

  return (
    <footer className="flex flex-col gap-3 border-t border-[#1e1e1e] bg-[#090909] px-6 py-10 text-[#eeeeee] sm:px-12">
      <div className="flex flex-col gap-1">
        <p className="text-[1.75rem] font-[600]">Let&apos;s connect.</p>
        <p className="max-w-[34rem] text-[0.95rem] leading-6 text-[#9a9a9a]">
          Feel free to reach out about projects, internships, collaborations, or
          for any futher questions you might have.
        </p>
      </div>

      <div className="w-fit rounded-full bg-[#eeeeee] px-4 py-2">
        <Link
          href="mailto:luisolea097@gmail.com"
          className="text-[0.92rem] font-[600] text-[#090909]"
        >
          Email me
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <div className="flex gap-1">
          {contacts.map((contact) => (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                contact.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              aria-label={contact.label}
              className="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full border border-[#2a2a2a] bg-[#161616] transition-colors hover:border-[#666666]"
            >
              <Image src={contact.icon} alt="" width={16} height={16} />
            </Link>
          ))}
        </div>

        <p className="ml-auto text-[0.8125rem] text-[#666666]">
          Designed and built by Luis Olea.
        </p>
      </div>
    </footer>
  );
}
