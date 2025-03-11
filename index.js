const users = [
    {name: "Alan", phone: "+5531994144202", email: "ms.alangabriel@gmail.com"},
    {name: "Emilly", phone: "+5531912345678", email: "emilly@gmail.com"},
    {name: "Erica", phone: "+5531987654321", email: "erica@gmail.com"},
    {name: "Iury", phone: "+5531900000000", email: "iury@gmail.com"},
    {name: "Marcely", phone: "+5531988888888", email: "marcely@gmail.com"},
    {name: "Myrna", phone: "+5531912341234", email: "myrna@gmail.com"},
];

const subscriptions = [
    {service: "HBOMax", cost: 3.33, frequency: "monthly"},
    {service: "PrimeVideo", cost: 3.72, frequency: "monthly"},
    {service: "DisneyPlus", cost: 61.48, frequency: "annual"},
    {service: "DisneyPlusPremium", cost: 93.28, frequency: "annual"},
];

function sendReminder(user, subscription)
{
    const message = `Hi ${user.name}, don't forget to pay your share of ${subscription.service}! Amount due: $${subscription.cost} (${subscription.frequency}).`;
    console.log(`Sending reminder to ${user.name}:`);
    console.log(message);
    console.log("---");
}

function simulateReminders()
{
    console.log("Starting simulation...\n");

    users.forEach((user) => {
        subscriptions.forEach((subscription) => {
            sendReminder(user, subscription);
        });
    });

    console.log("Simulation complete.");
}

simulateReminders();