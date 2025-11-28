exports.getAllRoles = async () => {
    return [
        {id:1, name: "Admin", description: "This is an admin."},
        {id:2, name: "Supervisor", description: "This is an supervisor."},
        {id:3, name: "User", description: "This is a user."}
    ];
}
