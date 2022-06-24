FROM python:3.8-buster

COPY . /app/

WORKDIR /app

RUN pip install -r requirements.txt

RUN pip install 'gunicorn==20.0.*'

EXPOSE 8000
#EXPOSE 5432 # Uncomment if you use postgresQL db

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["gunicorn", "--log-file=/var/log/gunicorn.log", "example.wsgi", "-b 0.0.0.0:8000"]

