import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Global cleanup
afterEach(() => {
  cleanup();
});

// Mock global objects
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
