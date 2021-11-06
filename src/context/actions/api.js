export const getAllProjects = async () => {
  const response = await fetch(`/api/projects`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return await response.json();
};

export const deleteProject = async (id) => {
  console.log(id);
  const response = await fetch(`/api/project/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return await response.json();
};

export const addProject = async ({ ...data }) => {
  const response = await fetch(`/api/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.json().message);
  }

  return response.json();
};

export const updateProject = async ({ ...data }) => {
  console.log(data.editId);
  console.log(data);
  const response = await fetch(`/api/project/update/${data.editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.projectState.project),
  });

  if (!response.ok) {
    throw new Error(response.json().message);
  }

  return response.json();
};
