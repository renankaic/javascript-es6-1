var ConnectionFactory = (function() {

    var stores = ['negociacoes'];
    var version = 5;
    var dbName = 'aluraframe';
    var conn = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possível criar instâncias de ConnectionFactory");
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {

                    if (!conn) conn = e.target.result;
                    resolve(conn);

                };

                openRequest.onerror = e => {

                    console.error(e.target.error);
                    reject(e.target.error.name);

                };

            });

        }

        static _createStores(connection) {

            stores.forEach(store => {

                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true });

            });

        }

    }

})();