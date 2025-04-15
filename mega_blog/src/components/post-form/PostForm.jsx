import React from "react";
import { useForm } from "react-hook-form";
import { button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm() {
    const { register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues } = useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        });
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.data);
    const submit = async data => {
        if (post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.id, {
                ...data, featuredImage: file ? file.id : undefined
            });

            if (dbPost) {
                navigate(`/post/${dbPost.id}`);
            }
        } else {
            const file = appwriteService.uploadFile(data.image[0]);

            if (file) {
                data.featuredImage = file.id;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.id });

                if (dbPost) {
                    navigate(`/post/${dbPost.id}`);
                }
            }
        }
    }
    const slugTransform = React.useCallback(value => {
        if (!value || typeof (value) !== "string") {
            return "";
        }

        return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const transformedSlug = slugTransform(value.title, { shouldValidate: true })
                setValue("slug", transformedSlug);
            }
        });

        return (() => subscription.unsubscribe());
    }), [watch, slugTransform, setValue];

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={e => {
                        const transformedSlug = slugTransform(e.currentTarget.value);
                        setValue("slug", transformedSlug, { shouldValidate: true });
                    }}
                />
                <RTE label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2">
                <Input label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
