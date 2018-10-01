# [Pwdlab](https://pwdlab.com)
#### Pwdlab - Open-Source Password Manager

An MVP project I started with the purpose of learning React/Redux and Node.js. Contains the basic elements of a password manager including authentication, 
RESTful APIs for users and records, and a pleasant UI interface for viewing, adding, editing, copying, and deleting passwords and other meta data (Using [ant.design](ant.design)).

The app is using encryption heavily to ensure the security of all the data stored by the users, and including a few layers of encryption.
The encryption layers could be simplified to a puzzle, and each piece reveals crucial information for the next piece to fit in, until the puzzle can be displayed.

#### Collection examples:
Each collection reveals data for the next, so a relational database approach was used to separate sensitive information apart.
The `cid` and `rid` are the real identifiers for the collections, and are SHA256 hashes consisting of user data, and uniquely generated salts and encryption keys.

Users:
```
{
    "_id": {
        "$oid": "5baaa061de6c3765e1668cf2"
    },
    "devices": [
        "SAfTnHDp70gwFXK7eRl7BuxHZe3HqAyb9TltiEiCoN+F8lKDeqCynrFDS3zi48Rj7ic6HZU9g4M1oScg2NPOvNaKpcRksdKsfqONyQzHcl4PvCGllRyv3v9zcMVxTFna/ynvIJP+XBzlpwY+pTon9prWsaBysVzwitjKsnjj145LccXTvl8zX/xTMLAILFfYAYIeY3BYXSviFYEZKd8GCxn8TBps4RAfL1OmUSy2dHnHe0ppu8dsci6ing+JGV7YHjPo4z2IIk+REyN08Z8nPzHCIa4bVI6QOY6aTvuUyhO5kJsy2PmY7HskZSaz+KZePiHSzIlVeKoiADpziVJ4Hw=="
    ],
    "email": "UcY7en7PCGH7VB3Uwq5kxN7jw2Bl1pBV1om6CahVh9M=",
    "password": "$2a$10$mVTaR3K4GdWDuB0V9uPPvOT9XnVPJ7iu/d8e1LcTpO5VkUSF240TK",
    "tokens": [
        {
            "_id": {
                "$oid": "5baaa061de6c3765e1668cf3"
            },
            "access": "auth",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmFhYTA2MWRlNmMzNzY1ZTE2NjhjZjIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM3OTA4ODMzLCJleHAiOjE1Mzc5MTA2MzN9.Lh2u4smyT9kWsQIU6rwMJtjTj2Wxdw-C-Pkna3AbLHI"
        }
    ],
    "salt": "U2FsdGVkX183wp83MB9MeBbkViXkZNwNxiQV82Hv4YDldZa4i4fi2rlNReQo04z2",
    "__v": 0
}

```

Cryptkeys:
```
{
    "_id": {
        "$oid": "5baaa061de6c3765e1668cf4"
    },
    "cid": "d75d3139e081b8a60467139668bc6d07555d542ca354c9d31482ea6bec3e6868",
    "pubkey": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsMUVzM1VVZFhWempvWC9XMHMrZwp5RFJzRHlVc1RMdGd3TXU1VVBlUGQ4MjRRN2NwY05Ra3EyM2JZREVxVnVyNnZjVDhIQ0NhekVGRmxTay9XM0FsCmNMdU9SOExkTW8ycGpJbTZhdlRiVUtCQkFKdzFMWGxmeTRFZUo0b1VIeXdnTG95L3ZxblFHc1pQVEJiR0tsaDIKR050eFZCT2QxZS9pamRGNkZaTjI1VXVKd0lMTmdEMXpoTG1FYkZmaGYyV2xVb1Y4SnlOUmsrN3YyYkNldFYyQgpBdmlMU3pDSnJGRVczVk9HR21WZXcxQlFYVFcvemlyaWszQWtlb3ZmRFU1ZWVPc3R4WHJVcGpQSFkzSUdjNUZGCjkraXhRSzNibjVyTkJhN3hNZHdzYlV6UVpMZXo3dENLVi9mTlBWMUh6UWxvazUxWnJVRWNzMFUyMWl5WXcrMjQKUVFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t",
    "privkey": "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ1hVU3pkUlIxZFhPT2gKZjliU3o2RElOR3dQSlN4TXUyREF5N2xROTQ5M3piaER0eWx3MUNTcmJkdGdNU3BXNnZxOXhQd2NJSnJNUVVXVgpLVDliY0NWd3U0NUh3dDB5amFtTWlicHE5TnRRb0VFQW5EVXRlVi9MZ1I0bmloUWZMQ0F1akwrK3FkQWF4azlNCkZzWXFXSFlZMjNGVUU1M1Y3K0tOMFhvVmszYmxTNG5BZ3MyQVBYT0V1WVJzVitGL1phVlNoWHduSTFHVDd1L1oKc0o2MVhZRUMrSXRMTUltc1VSYmRVNFlhWlY3RFVGQmROYi9PS3VLVGNDUjZpOThOVGw1NDZ5M0ZldFNtTThkagpjZ1p6a1VYMzZMRkFyZHVmbXMwRnJ2RXgzQ3h0VE5Ca3Q3UHUwSXBYOTgwOVhVZk5DV2lUblZtdFFSeXpSVGJXCkxKakQ3YmhCQWdNQkFBRUNnZ0VBYVZPVnVRZU00eG52VU5FZGhXd0U3SmFneVFJRkRmdzM0cnRyNlJJSkNVbG4KQTZ1UTZ2cWY4N3ZxUWRDM09mMGlQOG5IK3dRdS9CSkxEd0xCR1RLOHZQV3dtZjduM1hLQ0hGTWFNYXp5by9LSQpqSll1NWRKZ2ZkVUlXbGxnbkRvb3hINHdVZFQrQ0VVVm1VOFk3UXphVjM4WUtYL21FNjZBc2xxbmNqRk5SMWp1Cjd2S2tVZWJ5Q3M1WjZQYXZjU2J4dDd6ZU1OSEMxbTFJNUE2OFJESXdUc3ZTSEcwdm8vVzYwaU14VXlGQmlkVTQKbnloY2wwUGVhTUQ0OUdpKytUc2tQbGh0OHVFL1VFaFg1OG10OFIvN0VOTFNkQlRjbG5GTEVnNDlTYVRKczlPUwpMdFlMRGUrNW9NUU4rS290amFSaDdsN1VVVGZIREh6MlFMSDlpTFBqWVFLQmdRRHptV2VwczllQVZiQmdXaE9DCngvMFlyTUs5ZjgrK2lKR1JYVitJZGtUc3J1YjdrWUNscHV4b3B0ZVFNbjV3RDZtZDQrZitiSkluc2IxOEduQTAKZXdQT3dkUi9HcTk5dkRjVzhoQzhvQkNXTWJnRitzd1NjeG5WVWJ2akpNdXp2ZFRpeUlxdnpVUWI0MUQyRU9oaAo4M2hBQllOdk9WNjBIZ2JXRkExNDRNYzdiUUtCZ1FDZkJTVktSUit6bEt5K2J4Vk9sc2R6blczelZ0SFBBQUYyCmFDbERlOVgyMnU1ZXh4U3dtV0ZvK1pXdFRGOXl1Q1hIcHBYcDROTkFlLzRqYVpVZTZuUEo3SUprMTRsR3JSRXIKMjNmY1V1Y1VMU1VyT29jSitNa3h4eGJ3eDhxbklCb050L2JjMlRKVW5iaUdYQUttdE9rMTFCT01WTG9nR1dibgpBWlFrRk1BM3BRS0JnUUM4ZStWRzNMMlJNancvd1ZLNWJhNjdLZW1nb01XSW9ya25wZnptWk1TZDhoTU5jaDc5CmpiUDhvYVBIa2hwYzhQR0lGckVLSHMzVDR1WS9vV0ZTYWlDZkdVRW5lK2x2dTNOUTBNbjhlVWw4UFVvcmJrdjYKdG82MWpRRjVGcDU3SEJZZHg1ZnZ3VDdDNlZkYW5laUE2ZGNRaW5PUld1MlpKbWFadkhoVUlIQm4zUUtCZ0hNSgpVK3FnaXNoc3UzS2dCWGZ1MTZhcHNvcWd1ZkxYZkRkZUxzdWs0Q3BPUXJiSnFndi9TVnFaZzAvMHVlL1JpM01jCjdjSmRaRFYzL1djODBDV25VZEEzaWpUTlAzK2pYNUtzbDg4SklpV1VheGtVbysvd3pBdDRqUDN1YW9ud1RTaXoKZHFCWmQzR0RENlFURjgvbGUvZjJ6WlZ0RGFCKy85UUpibE9UdDJJSkFvR0FJaUFSOVhzcjgwNHFkeUpjV0dBcwpxbmg3Slk3MVVmMEhlUlh0cmJudHBlaXRrdFhRVE9rR0Y4NnlsKzkzVTl0SlhjbmZzVkQ5NStqUzZqZ1N3UzY1CkVzeU9XTnlvaVpORU01WmVBWmdQM2w4MVZvZjJLRkdJekx6NlBKNWRuTElJR1lVQ1drcmFhUVMwazYvajJ3WFAKTUxrdGhRajJmNThkYjJrVW56YWIwL289Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0=",
    "__v": 0
}
```

Records:
```
{
    "_id": {
        "$oid": "5b97f02ef3bd4816417b47cb"
    },
    "title": "b+d5OtO74dBx5A/+AfcFG7RzxXLxrM2Hh2IaaHc6XcAT54GOy84sBrw0HzkBr/ZAZ+OWvivjeTv3SMnfDj0pKYYJx0BoFP/kd2nTiFa3Mim1db13tCB4XqOcC++rz3P5wVa2Y4kt/ibWkjz/NfHC2ggvqqWD+VuzL/yEh19PtdDgjwSrBBBz+EUcwuFbtrDOMO/uWkN17lqVeJZh8Gjf4UBu1F6d26gC9e7IbSreBTqIVUPzRJINU/OZ0QoYyFwbj2uoHtEteJmPaI0nq29NUbA4d/KDsWRTVsTwbWGIXejP2mzV9Lzmk0JgYtWud54sU2RF1KB2sSyJHcU7JXlmkw==",
    "url": "PnHH02vphF6uG0nX3iryBmnGqR3ub+N+0o/q8itZPCvkMCcyQcEsu/1rGJoj2uJDOX3d+ZgYmnMiRDR2566v2zRoTQfEF3SW/zYKpfpLi3uzht7F8+czfGQgpTaN1V9LDHlcuHzeRYHm4S5GxqpofW1ZEUeH4VILtNxRSz4Q/rbNvEmeW0D0xDPjnyK4n+bQn8+PfAMGkvdiWD6u2RNC2GvDbwUrk66leS61AERfHKIkN4fr5XW9Su9XObnJKUDzDGOp5rp1Lv3ZpVLi0QO8UuC4RH4EU021feeKPXlE5iGKfUdH87yTML6SEeOXOFpu5hfZuTS5tvE5lgddD3Z4sA==",
    "login": "YHGkyFvJ/HSTVGuXlbOupsiOW9M+UV0zFk8yasEFsff41eHftasIHmsV3ppj++KP5kxcOX0cZhwbhJMV+6pzouhF3G7PrEpnFnLodqwwzq7oJ72WTHmKwsxZWa1i2xu8T1LQweOlfO8gs+lu2CiMaLmkkf1AabMJt8l31tQrzEBCNzonPJ4lHF8of2G4TLGg4EPlRmwIx96sOb68P7F7B/jyivlHicOka5KoK4Lxc10XxER4y+SfYEjSdapPZet8rnpo1KgfcypwJ6W0XO01ZXrVWiPJif5UJqay5VbDozO/NYqeIF3L2ueEgy9+QOQV/5Arb+O0UPiBRFwJo3FG1g==",
    "password": "Co8Mcz96KajPWjJGrXY5C/KNG9+1+dy2OKhwMaRFkZN+RtmyKnupS2ZFmb1+5zjrEP9Ubhr74mZhIMFqiYBQKayx48ZdQFBcJ5vEO7Nrrdjm9EQeOYb+BVaVt2U9cVUPu/HVgNLzRlzlKxQt3QxBRh46ElMTJtL0iUYWTcQCMmI6BzKD7v61qD7RZSFi1/p68YOAobYidVpVVhKoYLvzM+oVnt6g4SaZASBU/P7yy5udcbhEv1n0mKzOKNbWxRe0iSztfq+3qHlaoX03jwYKVKcVG31pLKsmvr3Uw5Wzzx7OBY+HEcI5/FLi0lv8VwVAzFf691hDQblk7M2taMbx7A==",
    "rid": "62861f861f505c161dc4881e285de5e6fae66044af045060f91c615767443659",
    "__v": 0
}
```

#### Next (possible) steps
The MVP is completed, though there can be endless ways to develop and make it a fully-featured and used app.
* Creating tests for backend/frontend
* 2FA authentication
* Bruteforce protection
* Groups/folders
* Browser extension

---

Copyright 2018 pwdlab.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
