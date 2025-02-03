import { Meta, StoryObj } from "@storybook/react";
import PostList from "@/app/posts/components/PostList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Decorator } from "@storybook/react";

// Create a QueryClient instance
const queryClient = new QueryClient();

const withQueryClient: Decorator = (Story) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const meta: Meta<typeof PostList> = {
  title: "Features/Posts/PostList",
  component: PostList,
  decorators: [withQueryClient],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    currentPage: { control: { type: "number", min: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default View
export const Default: Story = {
  args: {
    currentPage: 1,
  },
};
