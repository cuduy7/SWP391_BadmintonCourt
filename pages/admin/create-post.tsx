import { AdminLayout, PostNewForm } from "@/app/components";
import Link from "next/link";
//
export default function CreatePostPage() {
    return (
        <AdminLayout>
            <div className="relative mb-10 p-4">
                <div className="relative py-10">
                    <div className="flex justify-center">
                        <h1 className="text-primary-blue-cus font-semibold md:text-4xl text-3xl">
                            Tạo Sân mới
                        </h1>
                    </div>
                </div>
                <div className="relative">
                    <div className="py-4">
                        <h2 className="text-base font-medium text-primary-blue-cus whitespace-nowrap">
                            Xem thêm về{' '}
                            <span className="text-black underline">
                                <Link href="/rules">
                                    Quy định của chúng tôi
                                </Link>
                            </span>
                        </h2>
                    </div>
                </div>
                <PostNewForm />
            </div>
        </AdminLayout>
    );
}
