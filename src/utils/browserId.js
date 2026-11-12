const STORAGE_KEY = 'beyond_horizon_browser_id';


export function getBrowserId() {
    // let browserId = localStorage.getItem('browserId');
    let browserId = localStorage.getItem(
        STORAGE_KEY
    );

    if (!browserId) {

        browserId = crypto.randomUUID();

        localStorage.setItem(
            STORAGE_KEY,
            browserId
        );
    }

    // if (!id) {
    //     id =  crypto.randomUUID();
    //     localStorage.setItem('browserId', id);
    // }

    return browserId;
}