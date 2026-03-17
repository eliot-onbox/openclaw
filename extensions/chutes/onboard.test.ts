import { describe, expect, it } from "vitest";
import {
  applyChutesApiKeyConfig,
  applyChutesConfig,
  applyChutesProviderConfig,
  CHUTES_DEFAULT_MODEL_REF,
} from "./onboard.js";

describe("chutes onboarding config", () => {
  it("registers the Chutes provider catalog and aliases", () => {
    const cfg = applyChutesProviderConfig({});

    expect(cfg.models?.providers?.chutes?.api).toBe("openai-completions");
    expect(cfg.models?.providers?.chutes?.baseUrl).toBe("https://llm.chutes.ai/v1");
    expect(cfg.models?.providers?.chutes?.models?.length).toBeGreaterThan(0);
    expect(cfg.agents?.defaults?.models?.["chutes-fast"]).toEqual({
      alias: "chutes/zai-org/GLM-4.7-FP8",
    });
    expect(cfg.agents?.defaults?.models?.["chutes-vision"]).toEqual({
      alias: "chutes/chutesai/Mistral-Small-3.2-24B-Instruct-2506",
    });
    expect(cfg.agents?.defaults?.models?.["chutes-pro"]).toEqual({
      alias: "chutes/deepseek-ai/DeepSeek-V3.2-TEE",
    });
  });

  it("sets the default primary model for API key onboarding", () => {
    const cfg = applyChutesApiKeyConfig({
      agents: {
        defaults: {
          model: {
            fallbacks: ["existing-fallback"],
          },
        },
      },
    });

    expect(cfg.agents?.defaults?.model).toEqual({
      primary: CHUTES_DEFAULT_MODEL_REF,
      fallbacks: ["existing-fallback"],
    });
  });

  it("sets default text and image models for full onboarding", () => {
    const cfg = applyChutesConfig({});

    expect(cfg.agents?.defaults?.model).toEqual({
      primary: CHUTES_DEFAULT_MODEL_REF,
      fallbacks: ["chutes/deepseek-ai/DeepSeek-V3.2-TEE", "chutes/Qwen/Qwen3-32B"],
    });
    expect(cfg.agents?.defaults?.imageModel).toEqual({
      primary: "chutes/chutesai/Mistral-Small-3.2-24B-Instruct-2506",
      fallbacks: ["chutes/chutesai/Mistral-Small-3.1-24B-Instruct-2503"],
    });
  });
});
