SSH_KEY=

-include Makefile.settings

run:
	python manage.py runserver 8000

compose:
	docker-compose up -d

compose_stop:
	docker-compose up -d

compose_restart:
	docker-compose stop && docker-compose rm -f && docker-compose up -d

celery:
	celery -A webapp.celery:app worker -B -l info --concurrency=2 -Ofair

celery-beat:
	celery -A webapp beat -l info

static:
	npm run watch

build_static:
	npm install
	npm run build

check_dependencies:
	pip list --outdated

lint_python:
	prospector

clean:
	find . -name "*.pyc" -exec rm -rf {} \;

test:
	python manage.py test $(TESTS) --failfast --settings=core.test_settings

ansible_staging:
	ansible-playbook -i server/ansible/staging server/ansible/site.yml -u root --ask-vault

ansible_production:
	ansible-playbook -i server/ansible/production server/ansible/site.yml -u root --ask-vault

deploy_staging:
	make build_static
	fab -R staging deploy

deploy_production:
	make build_static
	fab -R production deploy
