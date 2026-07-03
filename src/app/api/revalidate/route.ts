import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";

  if (!isValidSignature(body, signature, process.env.SANITY_WEBHOOK_SECRET!)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const { _type } = JSON.parse(body);

  if (_type) {
    revalidateTag(_type, { expire: 0 });
  } else {
    revalidateTag("sanity", { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, tag: _type ?? "sanity" });
}
