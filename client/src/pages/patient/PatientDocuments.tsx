import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Image,
  Download,
  Eye,
  Calendar,
  Filter,
  Search,
  FileImage,
  Stethoscope,
  Activity,
  Brain,
  Heart,
  Bone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientDocuments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  // Mock documents data
  const documents = [

    {
      id: 1,
      name: "Urgent Care - PA Supervision",
      type: "Report",
      category: "other",
      date: "2024-02-01",
      doctor: "Dr. Smith",
      size: "1.2 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Urgent Care - PA Supervision.pdf"
    },
    {
      id: 7,
      name: "Orthopedic Surgery Report",
      type: "Surgery",
      category: "other",
      date: "2024-01-28",
      doctor: "Dr. Jones",
      size: "2.5 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Orthopedic Surgery.pdf"
    },
    {
      id: 8,
      name: "Neuro Surgery Report",
      type: "Surgery",
      category: "other",
      date: "2024-01-25",
      doctor: "Dr. Williams",
      size: "3.1 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Neuro Surgery.pdf"
    },
    {
      id: 9,
      name: "Emergency Medicine Report",
      type: "Report",
      category: "other",
      date: "2024-01-20",
      doctor: "Dr. Brown",
      size: "1.8 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Emergency Medicine.pdf"
    },
    {
      id: 10,
      name: "Cardiology Report 2",
      type: "Cardiology",
      category: "cardiology",
      date: "2024-01-18",
      doctor: "Dr. Davis",
      size: "1.5 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Cardio2.pdf"
    },
    {
      id: 11,
      name: "Cardiology Report",
      type: "Cardiology",
      category: "cardiology",
      date: "2024-01-15",
      doctor: "Dr. Miller",
      size: "1.4 MB",
      format: "PDF",
      status: "reviewed",
      thumbnail: "/placeholder.svg",
      url: "http://localhost:5000/external-reports/OMC Report Sample - Cardio.pdf"
    }

  ];

  const categories = [
    { value: "all", label: "All Documents", icon: FileText },
    { value: "radiology", label: "Radiology", icon: FileImage },
    { value: "laboratory", label: "Laboratory", icon: Activity },
    { value: "cardiology", label: "Cardiology", icon: Heart },
    { value: "prescription", label: "Prescriptions", icon: Stethoscope },
    { value: "other", label: "Other", icon: FileText }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed": return "bg-success/10 text-success";
      case "pending": return "bg-warning/10 text-warning";
      case "active": return "bg-primary/10 text-primary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getTypeIcon = (category: string) => {
    switch (category) {
      case "radiology": return FileImage;
      case "laboratory": return Activity;
      case "cardiology": return Heart;
      case "prescription": return Stethoscope;
      default: return FileText;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "File upload requires backend integration. Connect to Supabase to enable this feature.",
      variant: "default",
    });
  };

  const handleView = (document: any) => {
    if (document.url) {
      window.open(document.url, '_blank');
    } else {
      toast({
        title: "Viewing Document",
        description: `Opening ${document.name}...`,
      });
    }
  };

  const handleDownload = (document: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${document.name}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Medical Documents</h1>
            <p className="text-muted-foreground">Manage your X-rays, reports, and medical files</p>
          </div>
          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Quick Upload
            </CardTitle>
            <CardDescription>
              Upload your medical documents, X-rays, or scan reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={handleUpload}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drag and drop files here, or click to browse
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Supports: PDF, JPG, PNG, DICOM files up to 50MB
              </p>
              <Button variant="outline">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents, doctors, or types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => {
            const TypeIcon = getTypeIcon(document.category);
            return (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium text-foreground">
                          {document.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {document.type}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(document.status)}>
                      {document.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Document Preview */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <FileImage className="h-12 w-12 text-muted-foreground" />
                  </div>

                  {/* Document Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(document.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Stethoscope className="h-4 w-4" />
                      {document.doctor}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{document.format}</span>
                      <span>{document.size}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(document)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(document)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No documents found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Upload your first medical document to get started"
                }
              </p>
              {!searchTerm && selectedCategory === "all" && (
                <Button onClick={handleUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Document Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{documents.length}</div>
                <div className="text-sm text-muted-foreground">Total Documents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {documents.filter(d => d.status === "reviewed").length}
                </div>
                <div className="text-sm text-muted-foreground">Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {documents.filter(d => d.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {documents.filter(d => d.category === "radiology").length}
                </div>
                <div className="text-sm text-muted-foreground">X-rays & Scans</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDocuments;