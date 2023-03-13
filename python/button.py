import RPi.GPIO as GPIO
import time
import requests
import os

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_UP)


while True:
    input_state1 = GPIO.input(17)
    input_state2 = GPIO.input(27)
    input_state3 = GPIO.input(22)
    input_state4 = GPIO.input(26)

    if input_state1 == False:
        requests.post('http://localhost:3000/button1')
        time.sleep(0.2)
    elif input_state2 == False:
        requests.post('http://localhost:3000/button2')
        time.sleep(0.2)
    elif input_state3 == False:
        requests.post('http://localhost:3000/button3')
        time.sleep(0.2)
    elif input_state4 == False:
        requests.post('http://localhost:3000/button4')
        time.sleep(0.2)