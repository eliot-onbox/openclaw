import { describe, expect, it } from "vitest";
import { registerSingleProviderPlugin } from "../../test/helpers/extensions/plugin-registration.js";
import chutesPlugin from "./index.js";

describe("chutes provider plugin", () => {
  it("registers OAuth and API key auth flows under one provider", () => {
    const provider = registerSingleProviderPlugin(chutesPlugin);

    expect(provider.id).toBe("chutes");
    expect(provider.auth.map((method) => method.id)).toEqual(["oauth", "api-key"]);
    expect(provider.catalog?.run).toEqual(expect.any(Function));
  });
});
