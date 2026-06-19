resource "aws_db_instance" "postgres" {
  identifier             = "${var.environment}-notes-db"
  engine                 = "postgres"
  engine_version         = "15.18"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  storage_type           = "gp3"
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = var.vpc_security_group_ids
  publicly_accessible    = false
  skip_final_snapshot    = true
}
