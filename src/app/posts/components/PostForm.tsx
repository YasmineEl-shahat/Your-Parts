import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

interface PostData {
  title: string;
  body: string;
}

export const PostForm = ({
  onSubmit,
}: {
  onSubmit: (data: PostData) => void;
}) => {
  const { register, handleSubmit, formState } = useForm<PostData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("title")} className="w-full p-2 border rounded" />
      {formState.errors.title && <span className="text-red-500">Required</span>}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};
