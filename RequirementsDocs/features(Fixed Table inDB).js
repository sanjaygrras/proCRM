 [

  //  Role Master Configuration 
    { action_title: "ROLE_MASTER",
      description:"All Roles related tasks can be managed Here.",
      sub_options:[
                                  {
                                      action_title:"CREATE_NEW_ROLE",
                                      description: "user can create new role for the system",
                                  },
                                  {
                                    title:"MANAGE_ROLE_PERMISSION",
                                    description: "user can manage permissions for a role",
                                }
      ]

    },
    { action_title: "USER_MASTER",
      description:"All User related tasks can be managed Here.",
      sub_options:[
                                {
                                    action_title:"CREATE_NEW_USER",
                                    description: "user can create new User for the system",
                                },
                                {
                                  title:"UPDATE_USER_CREDENTIAL",
                                  description: "user can manage credentials for a user",
                                }
      ]

    }

]