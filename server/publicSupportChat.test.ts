import { describe, expect, it } from "vitest";
import { sanitizeConversationHistory } from "./publicSupportChat";

describe("sanitizeConversationHistory", () => {
  it("keeps only valid user and assistant messages", () => {
    expect(
      sanitizeConversationHistory([
        { role: "system", content: "ignore me" },
        { role: "user", content: "  hello  " },
        { role: "assistant", content: "Hi there" },
        { role: "user", content: "" },
        null,
      ]),
    ).toEqual([
      { role: "user", content: "hello" },
      { role: "assistant", content: "Hi there" },
    ]);
  });

  it("limits history to the most recent twelve entries", () => {
    const history = Array.from({ length: 15 }, (_, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: `message-${index}`,
    }));

    const sanitized = sanitizeConversationHistory(history);

    expect(sanitized).toHaveLength(12);
    expect(sanitized[0]?.content).toBe("message-3");
    expect(sanitized[11]?.content).toBe("message-14");
  });

  it("caps individual history messages at two thousand characters", () => {
    const sanitized = sanitizeConversationHistory([
      { role: "user", content: "x".repeat(2500) },
    ]);

    expect(sanitized[0]?.content).toHaveLength(2000);
  });
});
