const crypto = require("crypto");

const privateKey = crypto.createPrivateKey({
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDh5O5/x2F4NwKn\nqfSsg8LOKSRzz6jK32cTgiqwU1A5YGPTHFAF84xLkvorRKsps7xJmnY0Pn6AFMJ+\np4yDRfDRn2+DPz0MovJivxX0fkMnoR2j3Mc2JifVSXCB6wu1IHPVaD8nVBKAJ5QQ\ndMrAQw6zHAPG6l6XnJuI08ioXHC3fLm9dLjl69ImkiURiduDli4WFuFFw7vjvSda\nC2sjSdUVMuLUXVDuBPom5zlE4Y70AO/x88FyKPpQBPZYZ9SLnhMe3kULS9eANUt/\n5vSW0Fa2qhpdFV0Py+C+TrTaJ4LdmfIBIm8KL0fv3XuiYF+rKgfOonsa2I++Um0D\n8TCTnJPRAgMBAAECggEAYjZEAVcgyAD2zQmmALlaoYKewCFZbDbcHE28HKRkXUXM\nsPT+z8+XQCZbUSOOXVexNbkLymQfYLVl6GYVP9/RN3pfo8sDUnKn+onE1GNu9BRn\nDB7Jl//X0rIW0c1s7id5ZR/pUUKKtqA+jjcRDa05/2JfPAUa8kTbFI6rj5N9SDCH\nfMEtQ6KjusX4+bRXHT30ikuYOLgTECltxihvMSd2WMhucsmFZ+A5qAl5ZvXijQVE\nxeg4lroo/z0ZVnGv6girBT7zlUwvbxi+CK6V7zT6160wUkp2zlTV62asxvTWj9dd\nOAwB2muH+fsADUCjWZqZ58DwNF/6n/BqY49+axUV/wKBgQDy6UGrRpDGR5iQdGlY\nJlr0FD6aShojvTKfUOUNuIYuKM95DH/8znHY7j2ooXtG3a8diR62PQ9ZxvoWo9Xz\nzMqCyyqoU7Eq3jpyh3P8GO5TkUu1sp3I/3b7XTFZwRAGqUvWbFbMpdEvSh7EKwwi\nS7mZWEr5nkzdOngnqKY30SMecwKBgQDuEPEzfCDWRAa9lywD0us0HHJdqoZ2XwW1\no+to8YDlrGg8Xdfa9Y/fYpCevE1QRLeb9jnU/ar/tYdEpDICkMsnXuj327gw3BJ1\nKGcfoU4XSIim4JwSk5JOrhxsonRuAdb9mcnuw/fd9MAdDBMnsg1ZrGYEIuj+D98M\nOEkpWgePqwKBgGe1+Wi0JynQ9a1vVm7haWHept/fFYv+wndM5Y7XIsrgd7x5/sck\nKW1yQncWAvk9uv+ERM2QAlbVYn96EeYWoLv5HExj9zeTTCcL+BRBXLfnSAjaqw1f\nLSCjKGfmyv3dGFkDRof3n/ltzvb4XiTiaeqzzMcItE6cISLlmZopO7JLAoGAJUqu\nHdyB4E6Dp8s4b9joUx9potaFfaFg6ZUl2SiLgm7BXUNt/rSctudftB3XFo3NHTcy\n0/RwhuHOsKfv1YsM57vsTncyoSS4F3YewUupSehoz4s7p4VKU9zeQv4nstvC67Ld\nePNlrnUaavJrRbqUcMmaqWc2jCW8UNO4UivyJ0UCgYB9NtlfCo7elZBSYruqhR7Q\nZerCe/dU/HvIMqB6rDzAa5t7RxsZqgBGGvqt8+qMM3FP8P87uJHHWk6OduFE4v1o\ndpmkRmS+y79PUDqGo8JT2Q9DuJgBwgKL1jVtRlxZvqqIpdSmfVSO19NAcNAqGpPl\nN5QRh48fw/R01Km2ll9eXg==\n-----END PRIVATE KEY-----",
    format: 'pem',
});

const jwk = privateKey.export({ format: 'jwk' })

console.log(JSON.stringify(jwk));