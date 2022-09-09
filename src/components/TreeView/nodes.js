const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}
const nodes = [
    {
        text: 'Setup',
        value: 'setup',
        status: false,
        id: uniqueId(),
        nodes: [
            {
                text: 'View',
                value: 'setup_view',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Add/Edit',
                value: 'setup_add_edit',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Delete',
                value: 'setup_delete',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Practice',
                value: 'practice',
                status: false,
                id: uniqueId(),
                nodes: [
                    {
                        text: 'View',
                        value: 'practice_view',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Add/Edit',
                        value: 'practice_add_edit',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Delete',
                        value: 'practice_delete',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                ]
            },
            {
                text: 'Location',
                value: 'location',
                status: false,
                id: uniqueId(),
                nodes: [
                    {
                        text: 'View',
                        value: 'location_view',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Add/Edit',
                        value: 'location_add_edit',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Delete',
                        value: 'location_delete',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                ]
            },
        ]
    },
    {

        text: 'Fax',
        value: 'fax',
        status: false,
        id: uniqueId(),
        nodes: [
            {
                text: 'View',
                value: 'fax_view',
                status: false,
                id: uniqueId(),
                nodes: [],
            },
            {
                text: 'Add/Edit',
                value: 'fax_add_edit',
                status: false,
                id: uniqueId(),
                nodes: [],
            },
            {
                text: 'delete',
                value: 'fax_delete',
                status: false,
                id: uniqueId(),
                nodes: [],
            },
        ],
    }

];

export default nodes;



