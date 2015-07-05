import os
import uuid
from django.db import models
from django.core.urlresolvers import reverse
from sorl.thumbnail import ImageField, get_thumbnail, delete
from django.core.files.base import ContentFile


def get_file_path(instance, filename):
    filename = "%s.%s" % (uuid.uuid4(), filename.split('.')[-1].lower())
    return os.path.join('users_img/', filename)


class Graffiti(models.Model):
    width = models.PositiveIntegerField(editable=False, )
    height = models.PositiveIntegerField(editable=False, )
    photo = models.ImageField('Фото',
                              upload_to=get_file_path,
                              height_field='height',
                              width_field='width')
    name = models.CharField('Название', max_length=50)
    comment = models.CharField('Комментарий', max_length=140)
    lat = models.FloatField('Географическая широта', )
    lon = models.FloatField('Географическая долгота', )
    active = models.BooleanField('Активное', default=True)
    checked = models.BooleanField('Проверенное', default=False)
    legal = models.BooleanField('Легальное', default=False)
    date_created = models.DateTimeField('Создано',
                                        auto_now_add=True,
                                        auto_now=False, )
    date_updated = models.DateTimeField('Обновлено',
                                        auto_now_add=False,
                                        auto_now=True, )

    def __str__(self):
        return '%s, %s' % (self.id, self.name)

    def get_absolute_url(self):
        return reverse('graffiti', kwargs={'pk': self.id, })

    def save(self, *args, **kwargs):
        # Можно и асинхронную очередь сделать, но на первое время норм
        if not self.id:
            # Сначала сохраняем картинку
            super(Graffiti, self).save(*args, **kwargs)
            # Изменяем картинку
            resized = get_thumbnail(self.photo, 'x1024',
                                    quality=99,
                                    format='JPEG')
            # сохраняем
            self.photo.save(resized.name, ContentFile(resized.read()), True)
        super(Graffiti, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        storage, path = self.photo.storage, self.photo.path
        super(Graffiti, self).delete(*args, **kwargs)
        storage.delete(path)  # Удаляем файл после модели
        delete(path)

    class Meta:
        verbose_name = 'Граффити'
        verbose_name_plural = verbose_name