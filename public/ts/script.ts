interface IData {
    username: string,
    password: string,
    email?: string,
    name?: string
}

document.querySelector("#addUserForm")!.addEventListener("submit", async (event: Event): Promise<void> => {
    event.preventDefault();
    try {
        const username: HTMLInputElement = document.querySelector("#username") as HTMLInputElement;
        const password: HTMLInputElement = document.querySelector("#password") as HTMLInputElement;
        const email: HTMLInputElement = document.querySelector("#email") as HTMLInputElement;
        const name: HTMLInputElement = document.querySelector("#name") as HTMLInputElement;

        const data: IData = {
            username: username.value,
            password: password.value,
            email: email.value,
            name: name.value
        }

        const response: Response = await fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data })
        });
        const status = await response.json();
        document.querySelector("#addUserLog")!.textContent = `${status.message}`;
    } catch (error: unknown) {
        console.error(error);
        document.querySelector("#addUserLog")!.textContent = `${error}`;
    }
})

document.querySelector("#editUserForm")!.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    try {
        const username: HTMLInputElement = document.querySelector("#selectUserToEdit") as HTMLInputElement;
        const newPassword: HTMLInputElement = document.querySelector("#newPassword") as HTMLInputElement;
        const newEmail: HTMLInputElement = document.querySelector("#newEmail") as HTMLInputElement;
        const newName: HTMLInputElement = document.querySelector("#newName") as HTMLInputElement;
        const newData: object = {
            password: newPassword.value,
            email: newEmail.value,
            name: newName.value
        }
        const response = await fetch("/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username.value, newData: newData })
        });
        const status = await response.json();
        document.querySelector("#editUserLog")!.textContent = status.message;
    } catch (error: unknown) {
        console.error(error);
        document.querySelector("#editUserLog")!.textContent = `${error}`;
    }
})

document.querySelector("#deleteUserForm")!.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    try {
        const user: HTMLInputElement = document.querySelector("#deleteUsername") as HTMLInputElement;
        const response = await fetch("/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: user.value })
        });
        const status = await response.json();
        document.querySelector("#deleteUserLog")!.textContent = `${status.message}`;
    } catch (error: unknown) {
        console.error(error);
        document.querySelector("#deleteUserLog")!.textContent = `${error}`;
    }
})

document.querySelector("#findUserForm")!.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    try {
        const username: HTMLInputElement = document.querySelector("#findUsername") as HTMLInputElement;
        const response = await fetch("/find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username.value })
        });
        const data = await response.json();
        document.querySelector("#findUserLog")!.innerHTML = `Username: ${data.message.username}<br>Password: ${data.message.password}<br>Email: ${data.message.email}<br>Name: ${data.message.name}`;
    } catch (error: unknown) {
        console.error(error);
        document.querySelector("#findUserLog")!.innerHTML = `${error}`;
    }
})

async function loadUsers() {
    try {
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const users = data.message;
        document.querySelector("ul")!.innerHTML = users.map((user: any) => `<li>Username: ${user.username}<br>Password: ${user.password}<br>Email: ${user.email}<br>Name: ${user.name}</li>`).join("<br>");
    } catch (error: unknown) {
        console.error(error);
        document.querySelector("ul")!.innerHTML = `<li style="color:red">Error loading users</li>`;
    }
}