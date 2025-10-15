export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  products: string[];
  address: Address;
  doneBy: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(`${BASE_URL}/projects`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const createProject = async (formData: FormData): Promise<Project> => {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create project");
  const data = await res.json();
  return data.project;
};

export const updateProject = async (id: string, formData: FormData): Promise<Project> => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update project");
  const data = await res.json();
  return data.updated;
};

export const deleteProject = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
};
