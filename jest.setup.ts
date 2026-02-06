import "@testing-library/jest-dom";

// ✅ FIX: TextEncoder / TextDecoder for supertest
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// ✅ Mock next/router for App Router pages
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));
