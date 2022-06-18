import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

import 'package:new_iot/home/home.dart';
import 'package:new_iot/iotScreens/device1.dart';

class EmailSignUp extends StatefulWidget {
  @override
  _EmailSignUpState createState() => _EmailSignUpState();
}

class _EmailSignUpState extends State<EmailSignUp> {
  bool isLoading = false;
  final _formKey = GlobalKey<FormState>();
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;
  DatabaseReference dbRef =
      FirebaseDatabase.instance.reference().child("users");
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Sign Up")),
        body: Form(
            key: _formKey,
            child: SingleChildScrollView(
                child: Column(children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: "Enter User Name",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter User Name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Enter Email",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter an Email Address';
                    } else if (!value.contains('@')) {
                      return 'Pleas enter a valid email address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  obscureText: true,
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: "Enter Password",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter Password';
                    } else if (value.length < 6) {
                      return 'Password must be atleast 6 characters!';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Colors.lightBlue)),
                        onPressed: () {
                          if (_formKey.currentState.validate()) {
                            setState(() {
                              isLoading = true;
                            });
                            registerToFb();
                          }
                        },
                        child: Text('Submit'),
                      ),
              )
            ]))));
  }

  void registerToFb() {
    firebaseAuth
        .createUserWithEmailAndPassword(
            email: emailController.text, password: passwordController.text)
        .then((result) {
      dbRef.child(result.user.uid).set({
        "email": emailController.text,
        "name": nameController.text,
        "Devices": {
          "Device_1": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sliders": {
                "Slider_1": 0,
                "Slider_2": 0,
                "Slider_3": 0,
                "Slider_4": 0,
                "Slider_5": 0,
                "Slider_6": 0,
              },
              "Sensors": {
                "Range": {
                  "Sensor_1": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_2": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_3": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_4": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_5": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_6": {
                    "Min": 0,
                    "Max": 100,
                  }
                },
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_2": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_3": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_4": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_5": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          }
        }
      }).then((res) {
        isLoading = false;
        FirebaseAuth.instance.currentUser
            .updateDisplayName(nameController.text);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => Home(
                    uid: result.user.uid,
                    uname: nameController.text,
                    uemail: emailController.text,
                  )),
        );
      });
    }).catchError((err) {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Error"),
              content: Text(err.message),
              actions: [
                TextButton(
                  child: Text("Ok"),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                )
              ],
            );
          });
    });
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }
}
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

import 'package:new_iot/home/home.dart';
import 'package:new_iot/iotScreens/device1.dart';

class EmailSignUp extends StatefulWidget {
  @override
  _EmailSignUpState createState() => _EmailSignUpState();
}

class _EmailSignUpState extends State<EmailSignUp> {
  bool isLoading = false;
  final _formKey = GlobalKey<FormState>();
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;
  DatabaseReference dbRef =
      FirebaseDatabase.instance.reference().child("users");
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Sign Up")),
        body: Form(
            key: _formKey,
            child: SingleChildScrollView(
                child: Column(children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: "Enter User Name",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter User Name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Enter Email",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter an Email Address';
                    } else if (!value.contains('@')) {
                      return 'Pleas enter a valid email address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  obscureText: true,
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: "Enter Password",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter Password';
                    } else if (value.length < 6) {
                      return 'Password must be atleast 6 characters!';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Colors.lightBlue)),
                        onPressed: () {
                          if (_formKey.currentState.validate()) {
                            setState(() {
                              isLoading = true;
                            });
                            registerToFb();
                          }
                        },
                        child: Text('Submit'),
                      ),
              )
            ]))));
  }

  void registerToFb() {
    firebaseAuth
        .createUserWithEmailAndPassword(
            email: emailController.text, password: passwordController.text)
        .then((result) {
      dbRef.child(result.user.uid).set({
        "email": emailController.text,
        "name": nameController.text,
        "Devices": {
          "Device_1": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sliders": {
                "Slider_1": 0,
                "Slider_2": 0,
                "Slider_3": 0,
                "Slider_4": 0,
                "Slider_5": 0,
                "Slider_6": 0,
              },
              "Sensors": {
                "Range": {
                  "Sensor_1": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_2": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_3": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_4": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_5": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_6": {
                    "Min": 0,
                    "Max": 100,
                  }
                },
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_2": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_3": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_4": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_5": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          }
        }
      }).then((res) {
        isLoading = false;
        FirebaseAuth.instance.currentUser
            .updateDisplayName(nameController.text);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => Home(
                    uid: result.user.uid,
                    uname: nameController.text,
                    uemail: emailController.text,
                  )),
        );
      });
    }).catchError((err) {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Error"),
              content: Text(err.message),
              actions: [
                TextButton(
                  child: Text("Ok"),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                )
              ],
            );
          });
    });
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }
}
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

import 'package:new_iot/home/home.dart';
import 'package:new_iot/iotScreens/device1.dart';

class EmailSignUp extends StatefulWidget {
  @override
  _EmailSignUpState createState() => _EmailSignUpState();
}

class _EmailSignUpState extends State<EmailSignUp> {
  bool isLoading = false;
  final _formKey = GlobalKey<FormState>();
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;
  DatabaseReference dbRef =
      FirebaseDatabase.instance.reference().child("users");
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Sign Up")),
        body: Form(
            key: _formKey,
            child: SingleChildScrollView(
                child: Column(children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: "Enter User Name",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter User Name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Enter Email",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter an Email Address';
                    } else if (!value.contains('@')) {
                      return 'Pleas enter a valid email address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  obscureText: true,
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: "Enter Password",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter Password';
                    } else if (value.length < 6) {
                      return 'Password must be atleast 6 characters!';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Colors.lightBlue)),
                        onPressed: () {
                          if (_formKey.currentState.validate()) {
                            setState(() {
                              isLoading = true;
                            });
                            registerToFb();
                          }
                        },
                        child: Text('Submit'),
                      ),
              )
            ]))));
  }

  void registerToFb() {
    firebaseAuth
        .createUserWithEmailAndPassword(
            email: emailController.text, password: passwordController.text)
        .then((result) {
      dbRef.child(result.user.uid).set({
        "email": emailController.text,
        "name": nameController.text,
        "Devices": {
          "Device_1": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sliders": {
                "Slider_1": 0,
                "Slider_2": 0,
                "Slider_3": 0,
                "Slider_4": 0,
                "Slider_5": 0,
                "Slider_6": 0,
              },
              "Sensors": {
                "Range": {
                  "Sensor_1": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_2": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_3": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_4": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_5": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_6": {
                    "Min": 0,
                    "Max": 100,
                  }
                },
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_2": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_3": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_4": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_5": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          }
        }
      }).then((res) {
        isLoading = false;
        FirebaseAuth.instance.currentUser
            .updateDisplayName(nameController.text);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => Home(
                    uid: result.user.uid,
                    uname: nameController.text,
                    uemail: emailController.text,
                  )),
        );
      });
    }).catchError((err) {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Error"),
              content: Text(err.message),
              actions: [
                TextButton(
                  child: Text("Ok"),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                )
              ],
            );
          });
    });
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }
}
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

import 'package:new_iot/home/home.dart';
import 'package:new_iot/iotScreens/device1.dart';

class EmailSignUp extends StatefulWidget {
  @override
  _EmailSignUpState createState() => _EmailSignUpState();
}

class _EmailSignUpState extends State<EmailSignUp> {
  bool isLoading = false;
  final _formKey = GlobalKey<FormState>();
  FirebaseAuth firebaseAuth = FirebaseAuth.instance;
  DatabaseReference dbRef =
      FirebaseDatabase.instance.reference().child("users");
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Sign Up")),
        body: Form(
            key: _formKey,
            child: SingleChildScrollView(
                child: Column(children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: "Enter User Name",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter User Name';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Enter Email",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter an Email Address';
                    } else if (!value.contains('@')) {
                      return 'Pleas enter a valid email address';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: TextFormField(
                  obscureText: true,
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: "Enter Password",
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Enter Password';
                    } else if (value.length < 6) {
                      return 'Password must be atleast 6 characters!';
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Colors.lightBlue)),
                        onPressed: () {
                          if (_formKey.currentState.validate()) {
                            setState(() {
                              isLoading = true;
                            });
                            registerToFb();
                          }
                        },
                        child: Text('Submit'),
                      ),
              )
            ]))));
  }

  void registerToFb() {
    firebaseAuth
        .createUserWithEmailAndPassword(
            email: emailController.text, password: passwordController.text)
        .then((result) {
      dbRef.child(result.user.uid).set({
        "email": emailController.text,
        "name": nameController.text,
        "Devices": {
          "Device_1": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sliders": {
                "Slider_1": 0,
                "Slider_2": 0,
                "Slider_3": 0,
                "Slider_4": 0,
                "Slider_5": 0,
                "Slider_6": 0,
              },
              "Sensors": {
                "Range": {
                  "Sensor_1": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_2": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_3": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_4": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_5": {
                    "Min": 0,
                    "Max": 100,
                  },
                  "Sensor_6": {
                    "Min": 0,
                    "Max": 100,
                  }
                },
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_2": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_3": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_4": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          },
          "Device_5": {
            "Live": {
              "State": {
                "Ts": DateTime.now().millisecondsSinceEpoch,
                "Value": 0
              },
              "Sensors": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_2": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_3": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_4": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_5": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                },
                "Sensor_6": {
                  "Ts": DateTime.now().millisecondsSinceEpoch,
                  "Value": 0
                }
              },
              "Buttons": {
                "names": {
                  "Button_1": "Button 1",
                  "Button_2": "Button 2",
                  "Button_3": "Button 3",
                  "Button_4": "Button 4",
                  "Button_5": "Button 5",
                  "Button_6": "Button 6"
                },
                "Button_1": false,
                "Button_2": false,
                "Button_3": false,
                "Button_4": false,
                "Button_5": false,
                "Button_6": false,
                "Button_7": false,
                "Button_8": false,
                "Button_9": false
              }
            },
            "Storage": {
              "names": {
                "Sensor_1": "Sensor 1",
                "Sensor_2": "Sensor 2",
                "Sensor_3": "Sensor 3",
                "Sensor_4": "Sensor 4",
                "Sensor_5": "Sensor 5",
                "Sensor_6": "Sensor 6"
              },
              "Sensor_1": 0,
              "Sensor_2": 0,
              "Sensor_3": 0,
              "Sensor_4": 0,
              "Sensor_5": 0,
              "Sensor_6": 0
            },
          }
        }
      }).then((res) {
        isLoading = false;
        FirebaseAuth.instance.currentUser
            .updateDisplayName(nameController.text);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => Home(
                    uid: result.user.uid,
                    uname: nameController.text,
                    uemail: emailController.text,
                  )),
        );
      });
    }).catchError((err) {
      showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: Text("Error"),
              content: Text(err.message),
              actions: [
                TextButton(
                  child: Text("Ok"),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                )
              ],
            );
          });
    });
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
  }
}
