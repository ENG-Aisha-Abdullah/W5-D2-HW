let addtext = document.getElementById("addtext")
let addbtn = document.getElementById("addbtn")
let userToDo = document.getElementById("userToDo")

addbtn.addEventListener("click", () => {
    fetch('https://6821b690259dad2655b050b9.mockapi.io/api/ToDo', {
        method: 'POST',
        body: JSON.stringify({
            text: addtext.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => {
        location.reload();
    });
    // .then((response) => response.json())
    // .then((json) => console.log(json));
});
fetch('https://6821b690259dad2655b050b9.mockapi.io/api/ToDo')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let mission = document.createElement("p")
            let del = document.createElement("button")
            let edit = document.createElement("button")


            mission.innerText = element.text
            del.innerText = "Delete"
            edit.innerText = "Edit"

            del.addEventListener("click", () => {
                let confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذه المهمة؟");
                if (confirmDelete) {
                    fetch(`https://6821b690259dad2655b050b9.mockapi.io/api/ToDo/${element.id}`, {
                        method: 'DELETE',
                    }).then(() => {
                        location.reload();
                    });
                }
            });


            edit.addEventListener("click", () => {
                // prompt(text, defaultText)
                let newText = prompt("Edit Ypur Mission", element.text);
                if (newText !== null && newText.trim() !== "") {
                    fetch(`https://6821b690259dad2655b050b9.mockapi.io/api/ToDo/${element.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            text: newText,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },

                    }).then(() => {
                        location.reload();
                    });
                }
                // .then((response) => response.json())
                // .then((json) => console.log(json));
            });


            userToDo.appendChild(mission)
            userToDo.appendChild(del)
            userToDo.appendChild(edit)
            del.className = "btn btn-danger btn-sm";
            edit.className = "btn btn-warning btn-sm me-2";

            // button group div >> to container delet, edit buttons..
            let btnGroup = document.createElement("div");
            btnGroup.className = "d-flex gap-2";
            btnGroup.appendChild(edit);
            btnGroup.appendChild(del);

            // parent container div >> for button group and mission
            let wrapper = document.createElement("div");
            wrapper.className = "d-flex justify-content-between align-items-center rounded p-3 bg-light border-light shadow ";
            wrapper.appendChild(mission);
            wrapper.appendChild(btnGroup);

            userToDo.appendChild(wrapper);

        });
    });