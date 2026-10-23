// Display the current year in the footer
document.getElementById("year").textContent =
    new Date().getFullYear();

// Demo support request buttons
const supportButtons = document.querySelectorAll(".support-btn");
const supportDialog = document.getElementById("supportDialog");

supportButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const title = button.dataset.title;
        const amount = Number(button.dataset.amount)
            .toLocaleString("en-IN");

        document.getElementById("dialogTitle").textContent = title;

        document.getElementById("dialogMessage").textContent =
            "Sample support goal: ₹" + amount +
            ". This is a fictional demo request.";

        supportDialog.showModal();
    });
});

// Close the demo dialog
document.getElementById("closeDialog")
    .addEventListener("click", function () {
        supportDialog.close();
    });

// Handle student fee-support form
document.getElementById("supportForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value.trim();

        const collegeName =
            document.getElementById("collegeName").value.trim();

        const course =
            document.getElementById("course").value.trim();

        const amount =
            Number(document.getElementById("amount").value);

        const reason =
            document.getElementById("reason").value.trim();

        if (!studentName || !collegeName || !course ||
            !reason || amount <= 0) {
            document.getElementById("formMessage").textContent =
                "Please complete all fields correctly.";
            return;
        }

        const demoRequest = {
            studentName: studentName,
            collegeName: collegeName,
            course: course,
            amount: amount,
            reason: reason,
            status: "Pending demo verification",
            createdAt: new Date().toISOString()
        };

        // Store demo requests in this browser only
        const requests = JSON.parse(
            localStorage.getItem("nexoraDemoRequests") || "[]"
        );

        requests.push(demoRequest);

        localStorage.setItem(
            "nexoraDemoRequests",
            JSON.stringify(requests)
        );

        document.getElementById("formMessage").textContent =
            "Demo request saved in this browser. " +
            "It has not been sent to an admin or college.";

        event.target.reset();
    });