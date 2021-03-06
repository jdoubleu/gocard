<?php
namespace Neos\Flow\Persistence\Doctrine\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs! This block will be used as the migration description if getDescription() is not used.
 */
class Version20180807040632 extends AbstractMigration
{

    /**
     * @return string
     */
    public function getDescription()
    {
        return '';
    }

    /**
     * @param Schema $schema
     * @return void
     */
    public function up(Schema $schema)
    {
        // this up() migration is autogenerated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on "mysql".');
        
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_accounttoken CHANGE type type SET(\'registration\', \'password_reset\', \'password_change\')');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_activity CHANGE eventtype eventtype ENUM(\'create_register\', \'update_register\', \'delete_register\', \'create_card\', \'update_card\', \'delete_card\')');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_card CHANGE type type ENUM(\'single-choice\', \'multiple-choice\', \'text-input\', \'self-validate\')');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_member CHANGE role role SET(\'owner\', \'editor\', \'subscriber\')');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_user CHANGE status status ENUM(\'new\', \'verified\', \'active\')');
        $this->addSql('DROP INDEX idx_35dc14f03332102a ON neos_flow_resourcemanagement_persistentresource');
        $this->addSql('CREATE INDEX IDX_6954B1F63332102A ON neos_flow_resourcemanagement_persistentresource (sha1)');
    }

    /**
     * @param Schema $schema
     * @return void
     */
    public function down(Schema $schema)
    {
        // this down() migration is autogenerated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on "mysql".');
        
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_accounttoken CHANGE type type LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:simple_array)\'');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_activity CHANGE eventtype eventtype VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_card CHANGE type type VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_member CHANGE role role LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:simple_array)\'');
        $this->addSql('ALTER TABLE gocardteam_gocardapi_domain_model_v1_user CHANGE status status VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('DROP INDEX idx_6954b1f63332102a ON neos_flow_resourcemanagement_persistentresource');
        $this->addSql('CREATE INDEX IDX_35DC14F03332102A ON neos_flow_resourcemanagement_persistentresource (sha1)');
    }
}