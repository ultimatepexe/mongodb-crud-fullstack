"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.querySelector("#addUserForm").addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    try {
        const username = document.querySelector("#username");
        const password = document.querySelector("#password");
        const email = document.querySelector("#email");
        const name = document.querySelector("#name");
        const data = {
            username: username.value,
            password: password.value,
            email: email.value,
            name: name.value
        };
        const response = yield fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data })
        });
        const status = yield response.json();
        document.querySelector("#addUserLog").textContent = `${status.message}`;
    }
    catch (error) {
        console.error(error);
        document.querySelector("#addUserLog").textContent = `${error}`;
    }
}));
document.querySelector("#editUserForm").addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    try {
        const username = document.querySelector("#selectUserToEdit");
        const newPassword = document.querySelector("#newPassword");
        const newEmail = document.querySelector("#newEmail");
        const newName = document.querySelector("#newName");
        const newData = {
            password: newPassword.value,
            email: newEmail.value,
            name: newName.value
        };
        const response = yield fetch("/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username.value, newData: newData })
        });
        const status = yield response.json();
        document.querySelector("#editUserLog").textContent = status.message;
    }
    catch (error) {
        console.error(error);
        document.querySelector("#editUserLog").textContent = `${error}`;
    }
}));
document.querySelector("#deleteUserForm").addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    try {
        const user = document.querySelector("#deleteUsername");
        const response = yield fetch("/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: user.value })
        });
        const status = yield response.json();
        document.querySelector("#deleteUserLog").textContent = `${status.message}`;
    }
    catch (error) {
        console.error(error);
        document.querySelector("#deleteUserLog").textContent = `${error}`;
    }
}));
document.querySelector("#findUserForm").addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    try {
        const username = document.querySelector("#findUsername");
        const response = yield fetch("/find", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username.value })
        });
        const data = yield response.json();
        document.querySelector("#findUserLog").innerHTML = `Username: ${data.message.username}<br>Password: ${data.message.password}<br>Email: ${data.message.email}<br>Name: ${data.message.name}`;
    }
    catch (error) {
        console.error(error);
        document.querySelector("#findUserLog").innerHTML = `${error}`;
    }
}));
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = yield response.json();
            const users = data.message;
            document.querySelector("ul").innerHTML = users.map((user) => `<li>Username: ${user.username}<br>Password: ${user.password}<br>Email: ${user.email}<br>Name: ${user.name}</li>`).join("<br>");
        }
        catch (error) {
            console.error(error);
            document.querySelector("ul").innerHTML = `<li style="color:red">Error loading users</li>`;
        }
    });
}
