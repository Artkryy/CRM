const SERVER_URL = `http://localhost:3000`;

export const serverGetClients = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/clients`, {
      method: "GET",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const serverSendClient = async (client, method, id = null) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/clients/${method === "POST" ? "" : id}`,
      {
        method,
        body: JSON.stringify(client),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const serverDeleteClient = async (id) => {
  try {
    await fetch(`${SERVER_URL}/api/clients/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const serverFindClient = async (value) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/clients?search=${value}`, {
      method: "GET",
    });

    const result = await response.json();
    
    return result;
  } catch (error) {
    console.log(error);
  }
}
