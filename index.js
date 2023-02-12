var currentTab = 0;
showTab(currentTab);
var plan = 0, planPrice = 0, totalPrice = 0;
var addOns = [], add_on_price = [];

$("#next").click(function () {
    if (verifier() == 1) {
        document.querySelectorAll(".tab")[currentTab].style.display = "none";
        currentTab++;
        showTab(currentTab);
    }
    if (currentTab == 3) {
        addOnsCheck();
    }
    if (currentTab == 3) {
        fourPageUpdater();
        totalPrice = planPrice;
        for (let i = 0; i < add_on_price.length; i++) {
            totalPrice += add_on_price[i];
        }
        $(".total-price").text("$" + totalPrice + "/mo");
    }
    if (currentTab == 4) {
        $("#next").css("display", "none");
        $("#prev").css("display", "none");
    }
})

$("#prev").click(function () {
    document.querySelectorAll(".tab")[currentTab].style.display = "none";
    currentTab--;
    showTab(currentTab);
})

// when clicked on div changes the checkbox
$("#online-services-box").prop("checked", false);
$("#online-services").click( function () {
    if ($("#online-services-box").is(':Checked') == true) {
        $("#online-services-box").prop("checked", false);
    }
    else {
        $("#online-services-box").prop("checked", true);
    }
})
$("#larger-storage-box").prop("checked", false);
$("#larger-storage").click( function () {
    if ($("#larger-storage-box").is(':Checked') == true) {
        $("#larger-storage-box").prop("checked", false);
    }
    else {
        $("#larger-storage-box").prop("checked", true);
    }
})
$("#customisable-profile-box").prop("checked", false);
$("#customisable-profile").click( function () {
    if ($("#customisable-profile-box").is(':Checked') == true) {
        $("#customisable-profile-box").prop("checked", false);
    }
    else {
        $("#customisable-profile-box").prop("checked", true);
    }
})

// pushes the price and name of the addons
function addOnsCheck() {
    if ($("#online-services-box").is(':Checked') == true) {
        addOns.push("Online Services");
        add_on_price.push(1);
    }
    if ($("#larger-storage-box").is(':Checked') == true) {
        addOns.push("Larger Storage");
        add_on_price.push(2);
    }
    if ($("#customisable-profile-box").is(':Checked') == true) {
        addOns.push("Customisable Profile");
        add_on_price.push(2);
    }
}

// updates in the 4th step
function fourPageUpdater() {
    for (let i = 0; i < addOns.length; i++) {
        var x = document.querySelectorAll(".add-on");
        var y = document.querySelectorAll(".addon-price-final");
        x[i].innerHTML = addOns[i];
        y[i].innerHTML = "$" + add_on_price[i] + "/mo";
    }
}

// gets the price and the plan name from the 2nd step. called by onclick in html
function priceRetriver(planName, price) {
    plan = planName;
    planPrice = price;
    $("h5").text(plan);
    $("#plan-price").text("$" + planPrice + "/mo");
}

// used for showing tab
function showTab(tab) {
    var x = document.querySelectorAll(".tab");
    x[tab].style.display = "block";
    showingStep();
    if (currentTab != 0) {
        $("#prev").css("display", "block");
    }
    else {
        $("#prev").css("display", "none");
    }
    if (currentTab == 3) {
        $("#next").text("Confirm");
    }
    else {
        $("#next").text("Next Step");
    }
}

function showingStep() {
    var x = document.querySelectorAll(".step-no");
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("focus-step-no");
    }
    x[currentTab].classList.add("focus-step-no");
}

// to verify that the inputs and to proceed further
function verifier() {
    var checker = 1;
    if (currentTab == 0) {
        // empty
        if ($("#email").val() == "") {
            $("#email-check").text("This is a required field");
            $("#email").addClass("error-input");
            checker = 0;
        } else {
            $("#email-check").text("");
            $("#email").removeClass("error-input");
        }

        if ($("#name").val() == "") {
            $("#name-check").text("This is a required field");
            $("#name").addClass("error-input");
            checker = 0;
        } else {
            $("#name-check").text("");
            $("#name").removeClass("error-input");
        }

        if ($("#tel").val() == "") {
            $("#tel-check").text("This is a required field");
            $("#tel").addClass("error-input");
            checker = 0;
        } else {
            $("#tel-check").text("");
            $("#tel").removeClass("error-input");
        }

        // tel nos - only
        for (let i = 0; i < 10; i++) {
            if ($("#tel").val().charCodeAt(i) < 48 || $("#tel").val().charCodeAt(i) > 57) {
                checker = 0;
                $("#tel-check").text("only digits are allowed");
                $("#tel").addClass("error-input");
            }
        }
        // tel length
        if ($("#tel").val().length != 10) {
            $("#tel-check").text("length should be 10 digits only");
            $("#tel").addClass("error-input");
            checker = 0;
        }
    }
    if (currentTab == 1) {
        if (planPrice == 0) {
            checker = 0;
            alert("You must select a plan to proceed.")
        }
    }
    return checker;
}