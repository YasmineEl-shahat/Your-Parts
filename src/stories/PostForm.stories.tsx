import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import PostForm from "@/app/posts/components/PostForm";

const meta: Meta<typeof PostForm> = {
  title: "Features/Posts/PostForm",
  component: PostForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: { action: "submitted" },
    onCancel: { action: "cancelled" },
    isLoading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock translations for test interactions
const mockT = (key: string) => {
  const translations: { [key: string]: string } = {
    post_title: "Post Title",
    post_content: "Post Content",
    submit: "Submit",
    cancel: "Cancel",
    invalid_input: "Invalid input",
  };
  return translations[key] || key;
};

export const Default: Story = {
  args: {
    t: mockT, // Pass the mock translation function
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Post Title"), "Test Title");
    await userEvent.type(canvas.getByLabelText("Post Content"), "Test Content");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
  },
};

export const ValidationErrors: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(canvas.getByText("Invalid input")).toBeInTheDocument();
  },
};

// Edit Mode Story
export const EditPost: Story = {
  args: {
    t: mockT,
    initialValues: {
      title: "Existing Post Title",
      body: "Original post content",
    },
    isLoading: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify initial values
    const titleInput = canvas.getByLabelText("Post Title") as HTMLInputElement;
    const contentInput = canvas.getByLabelText(
      "Post Content"
    ) as HTMLTextAreaElement;

    await expect(titleInput.value).toBe("Existing Post Title");
    await expect(contentInput.value).toBe("Original post content");

    // Edit the form
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Post Title");
    await userEvent.clear(contentInput);
    await userEvent.type(contentInput, "Modified content with new information");

    // Submit the form
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

    // Verify submission data
    await expect(args.onSubmit).toHaveBeenCalledWith({
      title: "Updated Post Title",
      body: "Modified content with new information",
    });
  },
};
