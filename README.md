

```markdown
# Discord Hava Durumu Botu

Bu proje, kullanıcılara belirtilen şehir için hava durumu bilgilerini günlük olarak DM (özel mesaj) yoluyla gönderen bir Discord botudur. Hava durumu verileri OpenWeatherMap API'si kullanılarak sağlanır ve kullanıcı bilgileri MongoDB veritabanında saklanır.

## Gerekli Modüller

- `discord.js`: Discord botunu oluşturmak ve yönetmek için.
- `node-fetch`: API isteklerini yapmak için.
- `mongoose`: MongoDB veritabanı ile etkileşim kurmak için.

## Kurulum

### Adım 1: Gerekli Modüllerin Yüklenmesi

Proje klasörünüzde gerekli modülleri yüklemek için aşağıdaki komutları çalıştırın:

```
mkdir discord-hava-durumu-botu
cd discord-hava-durumu-botu
npm init -y
npm install discord.js node-fetch mongoose
```

### Adım 2: Botun Çalıştırılması

Proje klasörünüzde aşağıdaki komutu çalıştırarak botu başlatın:

```
node bot.js
```

## Kullanım

Discord'da botun bulunduğu bir kanalda aşağıdaki komutu kullanarak hava durumu bildirimlerini ayarlayabilirsiniz:

```
!hava-durumu {şehir} {saat:dakika}
```

Örneğin:

```
!hava-durumu İstanbul 09:00
```

Bu komut, belirtilen şehir için hava durumu bilgilerini her gün saat 09:00'da kullanıcıya DM olarak gönderecektir.

## Geliştirme Fikirleri

- Kullanıcıların hava durumu bildirimlerini durdurmalarına veya değiştirmelerine olanak tanıyabilirsiniz.
- Farklı şehirlerde birden fazla iş kurabilirsiniz.
- Hava durumu bilgilerini daha ayrıntılı hale getirebilirsiniz (yükseklik, basınç vb.).

Bu bot, her kullanıcı için kişiselleştirilmiş hava durumu bildirimleri sunar ve MongoDB veritabanında kullanıcı bilgilerini saklar.
```

