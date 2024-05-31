import CommonBtn from "@/components/commonBtn";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/test">
        <CommonBtn size="lg">테스트 시작</CommonBtn>
      </Link>
    </main>
  );
}
