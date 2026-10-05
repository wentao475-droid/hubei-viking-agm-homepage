import assert from "node:assert/strict";
import test from "node:test";
import nodemailer from "nodemailer";

test("inquiry mail supports sender, recipient, reply-to and multilingual text without external delivery", async () => {
  const mailer = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
  const result = await mailer.sendMail({
    from: "Viking AGM <sales@viking.example>",
    to: "inquiries@viking.example",
    replyTo: "Buyer <buyer@example.net>",
    subject: "Viking AGM lead #1 | AGM separator",
    text: "询盘：Please quote 1.2 mm AGM sheets. طلب عينة",
    textEncoding: "base64"
  });
  assert.deepEqual(result.envelope, {
    from: "sales@viking.example", to: ["inquiries@viking.example"]
  });
  const message = result.message.toString();
  assert.match(message, /Reply-To: Buyer <buyer@example.net>/);
  assert.match(message, /Subject: Viking AGM lead #1 \| AGM separator/);
  const body = message.split(/\r?\n\r?\n/).slice(1).join("\n\n");
  assert.match(Buffer.from(body.replace(/\s/g, ""), "base64").toString(), /询盘：Please quote 1.2 mm AGM sheets. طلب عينة/);
});
