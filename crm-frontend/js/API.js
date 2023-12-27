import { createClientItem } from "./createClientItem.js";
import { showErrorsMessages } from "./createValidateForm.js";

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

    if (response.ok && method === "POST") {
      document
        .querySelector(".clients__tbody")
        .append(createClientItem(result));
      document.getElementById("add-modal").remove();
    }
    const modalInputs = document.querySelectorAll("input");
    showErrorsMessages(modalInputs, result.errors);

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
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};
