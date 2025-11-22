import PageSection from "@/components/section/PageSection";
import { Button } from "@/components/ui/button";

const AdminNewsPage = () => {
  return (
    <PageSection>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Welcome to News Managment</h1>
        <Button>Add News</Button>
      </div>
    </PageSection>
  );
};

export default AdminNewsPage;
