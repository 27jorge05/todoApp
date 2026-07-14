const taskStorageKey = "todoAppTasks";
const categoryStorageKey = "todoAppCategories";

const openTaskButton = document.querySelector(".createTaskButton");
const openCategoryButton = document.querySelector(".createCategoryButton");

const taskModal = document.querySelector("#taskModal");
const categoryModal = document.querySelector("#categoryModal");

const taskForm = document.querySelector("#taskForm");
const categoryForm = document.querySelector("#categoryForm");

const cancelTaskButton = document.querySelector("#cancelTask");
const cancelCategoryButton = document.querySelector("#cancelCategory");

const taskTitleInput = document.querySelector("#taskTitle");
const taskCategorySelect = document.querySelector("#taskCategory");
const categoryNameInput = document.querySelector("#categoryName");

const tasksList = document.querySelector(".tasksList");
const categoryList = document.querySelector(".categoryList");

let tasks = loadTasks();
let categories = loadCategories();
let selectedCategory = "general";

renderCategories();
renderCategoryOptions();
renderTasks();


openTaskButton.addEventListener("click", function () {
    taskModal.showModal();
    taskTitleInput.focus();
});

openCategoryButton.addEventListener("click", function () {
    categoryModal.showModal();
    categoryNameInput.focus();
});

cancelTaskButton.addEventListener("click", function () {
    closeTaskModal();
});

cancelCategoryButton.addEventListener("click", function () {
    closeCategoryModal();
});

function closeTaskModal() {
    taskModal.close();
    taskForm.reset();
}

function closeCategoryModal() {
    categoryModal.close();
    categoryForm.reset();
}


taskModal.addEventListener("click", function (event) {
    if (event.target === taskModal) {
        closeTaskModal();
    }
});

categoryModal.addEventListener("click", function (event) {
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
});

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(taskForm);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const category = formData.get("category");

    if (!title) {
        alert("El título de la tarea es obligatorio.");
        taskTitleInput.focus();
        return;
    }

    const newTask = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        category: category,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
    closeTaskModal();
});


categoryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = categoryNameInput.value.trim();

    if (!categoryName) {
        alert("El nombre de la categoría es obligatorio.");
        categoryNameInput.focus();
        return;
    }

    const categoryId = createCategoryId(categoryName);

    const categoryAlreadyExists = categories.some(function (category) {
        return category.id === categoryId;
    });

    if (categoryAlreadyExists) {
        alert("Esa categoría ya existe.");
        categoryNameInput.focus();
        return;
    }

    const newCategory = {
        id: categoryId,
        name: categoryName
    };

    categories.push(newCategory);

    saveCategories();
    renderCategories();
    renderCategoryOptions();
    closeCategoryModal();
});

function createCategoryId(categoryName) {
    return categoryName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}

function renderCategories() {
    categoryList.innerHTML = "";
    const categoryFragment = document.createDocumentFragment();

    categories.forEach(function (category) {
        const listItem = document.createElement("li");
        const categoryButton = document.createElement("button");

        categoryButton.type = "button";
        categoryButton.className = "categoryButton";
        categoryButton.textContent = category.name;
        categoryButton.dataset.categoryId = category.id;

        if (category.id === selectedCategory) {
            categoryButton.classList.add("categorybuttonActive");
        }

        listItem.appendChild(categoryButton);
        categoryFragment.appendChild(listItem);
    });

    categoryList.appendChild(categoryFragment);
}

function renderCategoryOptions() {
    taskCategorySelect.innerHTML = "";
    const optionFragment = document.createDocumentFragment();

    categories.forEach(function (category) {
        const option = document.createElement("option");

        option.value = category.id;
        option.textContent = category.name;

        optionFragment.appendChild(option);
    });

    taskCategorySelect.appendChild(optionFragment);
    taskCategorySelect.value = selectedCategory;
}

categoryList.addEventListener("click", function (event) {
    const categoryButton = event.target.closest(".categoryButton");

    if (!categoryButton) {
        return;
    }

    selectedCategory = categoryButton.dataset.categoryId;

    renderCategories();
    renderCategoryOptions();
    renderTasks();
});

function renderTasks() {
    tasksList.innerHTML = "";

    const filteredTasks = tasks.filter(function (task) {
        return task.category === selectedCategory;
    });

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.className = "emptyMessage";
        emptyMessage.textContent = "Todavía no tienes tareas en esta categoría.";

        tasksList.appendChild(emptyMessage);
        return;
    }

    const taskFragment = document.createDocumentFragment();

    filteredTasks.forEach(function (task) {
        const taskCard = createTaskCard(task);
        taskFragment.appendChild(taskCard);
    });

    tasksList.appendChild(taskFragment);
}

function createTaskCard(task) {
    const taskCard = document.createElement("article");
    const taskCheckbox = document.createElement("input");
    const taskContent = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDescription = document.createElement("p");
    const taskStatus = document.createElement("span");
    const taskActions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    taskCard.className = "taskCard";
    taskCard.dataset.taskId = task.id;

    if (task.completed) {
        taskCard.classList.add("taskCard-completed");
    }

    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "taskCheckbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.setAttribute(
        "aria-label",
        `Marcar ${task.title} como completada`
    );

    taskContent.className = "taskCard-content";

    taskTitle.className = "taskCard-title";
    taskTitle.textContent = task.title;

    taskDescription.className = "taskCard-description";
    taskDescription.textContent = task.description || "Sin descripción";

    taskStatus.className = "taskCard-status";
    taskStatus.textContent = task.completed
        ? "Completada"
        : "Pendiente";

    taskActions.className = "taskCard-actions";

    editButton.type = "button";
    editButton.className = "editTaskButton";
    editButton.textContent = "Editar";

    deleteButton.type = "button";
    deleteButton.className = "deleteTaskButton";
    deleteButton.textContent = "Eliminar";

    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDescription);

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskCard.appendChild(taskCheckbox);
    taskCard.appendChild(taskContent);
    taskCard.appendChild(taskStatus);
    taskCard.appendChild(taskActions);

    return taskCard;
}

tasksList.addEventListener("change", function (event) {
    if (!event.target.classList.contains("taskCheckbox")) {
        return;
    }

    const taskCard = event.target.closest(".taskCard");
    const taskId = taskCard.dataset.taskId;

    toggleTaskCompleted(taskId);
});
tasksList.addEventListener("click", function (event) {
    const taskCard = event.target.closest(".taskCard");

    if (!taskCard) {
        return;
    }

    const taskId = taskCard.dataset.taskId;

    if (event.target.classList.contains("editTaskButton")) {
        editTask(taskId);
    }

    if (event.target.classList.contains("deleteTaskButton")) {
        deleteTask(taskId);
    }
});

function toggleTaskCompleted(taskId) {
    const selectedTask = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!selectedTask) {
        return;
    }

    selectedTask.completed = !selectedTask.completed;

    saveTasks();
    renderTasks();
}

function editTask(taskId) {
    const selectedTask = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!selectedTask) {
        return;
    }

    const newTitle = prompt(
        "Escribe el nuevo título:",
        selectedTask.title
    );

    if (newTitle === null) {
        return;
    }

    const normalizedTitle = newTitle.trim();

    if (!normalizedTitle) {
        alert("El título no puede estar vacío.");
        return;
    }

    selectedTask.title = normalizedTitle;

    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    const selectedTask = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (!selectedTask) {
        return;
    }

    const shouldDelete = confirm(
        `¿Quieres eliminar la tarea "${selectedTask.title}"?`
    );

    if (!shouldDelete) {
        return;
    }

    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem(
        taskStorageKey,
        JSON.stringify(tasks)
    );
}

function loadTasks() {
    try {
        const storedTasks = localStorage.getItem(taskStorageKey);

        if (!storedTasks) {
            return [];
        }

        const parsedTasks = JSON.parse(storedTasks);

        return Array.isArray(parsedTasks)
            ? parsedTasks
            : [];
    } catch (error) {
        console.error("No fue posible cargar las tareas:", error);
        return [];
    }
}

function saveCategories() {
    localStorage.setItem(
        categoryStorageKey,
        JSON.stringify(categories)
    );
}

function loadCategories() {
    const defaultCategories = [
        {
            id: "general",
            name: "General"
        }
    ];

    try {
        const storedCategories = localStorage.getItem(
            categoryStorageKey
        );

        if (!storedCategories) {
            return defaultCategories;
        }

        const parsedCategories = JSON.parse(storedCategories);

        if (!Array.isArray(parsedCategories)) {
            return defaultCategories;
        }

        const hasGeneralCategory = parsedCategories.some(
            function (category) {
                return category.id === "general";
            }
        );

        if (!hasGeneralCategory) {
            parsedCategories.unshift(defaultCategories[0]);
        }

        return parsedCategories;
    } catch (error) {
        console.error(
            "No fue posible cargar las categorías:",
            error
        );

        return defaultCategories;
    }
}
