create_db:
	python manage.py sqlcreate | sudo -u postgres psql
	echo "create extension pgcrypto" | sudo -u postgres psql

shell:
	poetry install
	python manage.py migrate
	python manage.py shell_plus

run:
	poetry install
	python manage.py migrate
	python manage.py runserver 

reset_db:
	python manage.py reset_db

generate_test_data:
	python manage.py migrate 
	python manage.py runscript generate_test_data -v3

show_urls:
	python manage.py show_urls

run_post:
	postgraphile -c 'postgres://django_app:password@localhost:5432/django_user'\
		--jwt-secret "rj@w^kj#@@5598)!($&(65d2*ef_9a6@9j_*qm7euo^cr+v409"\
		--jwt-token-identifier public.jwt_token\
		--cors\
		--jwt-verify-audience ''
